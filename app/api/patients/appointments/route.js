import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await dbConnect();

    // token থেকে patient বের করা
    const cookieStore = await cookies();
    const token = cookieStore.get("patient_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = jwt.verify(token, process.env.PATIENT_JWT_SECRET);

    // patient এর সব appointment খুঁজে আনা
    const appts = await Appointment.find({ patientUser: payload.id })
      .populate("doctor", "name specialization")  // ডাক্তার নামও আনা
      .sort({ date: -1 });  // latest আগে

    return NextResponse.json({ appointments: appts });
  } catch (e) {
    console.error("Fetch appointments failed:", e);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
