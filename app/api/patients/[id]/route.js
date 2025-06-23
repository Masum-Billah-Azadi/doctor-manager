import dbConnect from '@/lib/dbConnect';
import Patient from '@/models/Patient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from "next/server";

export async function GET(req, context) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const id = (await context.params).id;

  if (!session) return new Response("Unauthorized", { status: 401 });

  const patient = await Patient.findOne({
    _id: id,
    doctorId: session.user.id,
  });

  if (!patient) return new Response("Patient not found", { status: 404 });

  return Response.json(patient);
}

export async function DELETE(req, context) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const id = (await context.params).id;

  if (!session) return new Response("Unauthorized", { status: 401 });

  await Patient.findOneAndDelete({ _id: id, doctorId: session.user.id });

  return new Response("Patient deleted", { status: 200 });
}

export async function PUT(req, context) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = (await context.params).id;
  const data = await req.json();

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: id, doctorId: session.user.id },
      data,
      { new: true }
    );

    if (!updatedPatient) {
      return NextResponse.json({ error: "Patient not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Update failed", details: err.message }, { status: 500 });
  }
}
