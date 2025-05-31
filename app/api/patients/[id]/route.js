import dbConnect from '@/lib/dbConnect';
import Patient from '@/models/Patient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

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

export async function DELETE(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  await Patient.findOneAndDelete({ _id: params.id, doctorId: session.user.id });
  return new Response('Patient deleted', { status: 200 });
}
