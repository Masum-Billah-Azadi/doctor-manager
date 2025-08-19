import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import PatientUser from "@/models/PatientUser";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { doctorId, reason, preferredDateTime } = body;

    // ✅ patient token বের করা
    const cookieStore = await cookies();
    const token = cookieStore.get("patient_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = jwt.verify(token, process.env.PATIENT_JWT_SECRET);

    // ✅ patient user নিশ্চিত করা
    const patient = await PatientUser.findById(payload.id);
    if (!patient) return NextResponse.json({ error: "Patient not found" }, { status: 404 });

    // ✅ appointment create করা
    const appt = new Appointment({
      doctor: doctorId,
      patientUser: patient._id,   // 👈 এখানে পাঠানো হচ্ছে
      reason,
      date: preferredDateTime,    // 👈 Appointment model-এ field নাম `date`
    });

    await appt.save();

    return NextResponse.json({ ok: true, appointment: appt });
  } catch (e) {
    console.error("Booking failed:", e);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
