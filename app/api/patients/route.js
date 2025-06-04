import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Patient from '@/models/Patient';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();

  const { name, age, gender, phone, address } = await req.json();
  const doctorEmail = session.user.email;

  // Find the current max patientNumber for this doctor
  const lastPatient = await Patient.findOne({ doctorEmail }).sort({ patientNumber: -1 });
  const nextPatientNumber = lastPatient ? lastPatient.patientNumber + 1 : 1;

  const newPatient = new Patient({
    name,
    age,
    gender,
    phone,
    address,
    doctorEmail,
    patientNumber: nextPatientNumber,
  });

  await newPatient.save();

  return new Response(JSON.stringify({ success: true, patient: newPatient }), { status: 201 });
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();

  const patients = await Patient.find({ doctorEmail: session.user.email }).sort({ patientNumber: 1 });
  return new Response(JSON.stringify(patients), { status: 200 });
}
