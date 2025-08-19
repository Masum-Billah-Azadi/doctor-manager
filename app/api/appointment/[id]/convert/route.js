import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import Patient from "@/models/Patient";
import PatientUser from "@/models/PatientUser";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  await dbConnect();
  const { id } = await context.params;

  try {
    const appt = await Appointment.findById(id).populate("patientUser doctor");
    if (!appt) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    if (appt.status !== "accepted") {
      return NextResponse.json({ error: "Only accepted appointments can be converted" }, { status: 400 });
    }

    // Patient number per doctor (increment)
    const last = await Patient.findOne({ doctorId: appt.doctor._id }).sort({ patientNumber: -1 });
    const nextNo = last ? last.patientNumber + 1 : 1;

    const pUser = await PatientUser.findById(appt.patientUser._id);

    const created = await Patient.create({
      name: pUser.name,
      age: null,
      gender: "",
      contact: pUser.phone,
      address: "",
      medicalHistory: "",
      doctorId: appt.doctor._id,
      patientNumber: nextNo,
    });

    return NextResponse.json({ ok: true, patient: created });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Convert failed" }, { status: 500 });
  }
}
