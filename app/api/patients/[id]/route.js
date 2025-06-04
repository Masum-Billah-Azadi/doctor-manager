import dbConnect from '@/lib/dbConnect';
import Patient from '@/models/Patient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req, context) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { id } = await context.params;

  if (!session) return new Response("Unauthorized", { status: 401 });

  const patient = await Patient.findOne({
    _id: id,
    doctorEmail: session.user.email,
  });

  if (!patient) return new Response("Patient not found", { status: 404 });

  return Response.json(patient);
}

export async function DELETE(req, context) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { id } = await context.params;

  if (!session) return new Response("Unauthorized", { status: 401 });

  await Patient.findOneAndDelete({ _id: id, doctorEmail: session.user.email });

  return new Response("Patient deleted", { status: 200 });
}
export async function PUT(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  const data = await req.json();
  const updated = await Patient.findOneAndUpdate(
    { _id: params.id, doctorId: session.user.id },
    data,
    { new: true }
  );
  return Response.json(updated);
}