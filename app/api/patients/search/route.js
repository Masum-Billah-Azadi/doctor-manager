// app/api/patients/search/route.js

import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Patient from "@/models/Patient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  const regex = new RegExp(query, "i");
  let patientQuery = {
    doctorId: session.user.id,
    $or: [{ name: { $regex: regex } }],
  };

  // Add patientNumber only if query is a valid number
  if (!isNaN(query)) {
    patientQuery.$or.push({ patientNumber: Number(query) });
  }

  try {
    const patients = await Patient.find(patientQuery).lean();
    return NextResponse.json({ patients });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
