// app/api/appointment/doctor/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
// ensure the schema is registered for populate, even if unused directly
// eslint-disable-next-line no-unused-vars
import PatientUser from "@/models/PatientUser";

export async function GET(req, context) {
  // ✅ IMPORTANT: await context.params, not context
  const { id } = await context.params;

  try {
    await dbConnect();

    const list = await Appointment.find({ doctor: id })
      .populate("patientUser", "name phone email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctor appointments" },
      { status: 500 }
    );
  }
}
