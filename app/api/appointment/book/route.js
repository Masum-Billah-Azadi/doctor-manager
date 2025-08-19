import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import PatientUser from "@/models/PatientUser";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await dbConnect();
    const { doctorId, reason, preferredDateTime } = await req.json();

    if (!doctorId) {
      return NextResponse.json({ error: "doctorId required" }, { status: 400 });
    }

    // token থেকে patient বের করা
    const cookieStore = await cookies();
    const token = cookieStore.get("patient_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let payload;
    try {
      payload = jwt.verify(token, process.env.PATIENT_JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const patient = await PatientUser.findById(payload.pid);
    if (!patient) return NextResponse.json({ error: "Patient not found" }, { status: 404 });

    // date validate
    const date = preferredDateTime ? new Date(preferredDateTime) : null;
    if (!date || isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid or missing date" }, { status: 400 });
    }

    const appt = await Appointment.create({
      doctor: doctorId,
      patientUser: patient._id,
      reason: reason ?? "",
      date,
      status: "pending",
    });

    return NextResponse.json({ ok: true, appointment: appt }, { status: 201 });
  } catch (e) {
    console.error("Booking failed:", e);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
