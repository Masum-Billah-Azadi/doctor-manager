import dbConnect from '@/lib/dbConnect';
import Patient from '@/models/Patient';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newPatient = new Patient(body);
    await newPatient.save();
    return new Response(JSON.stringify({ message: 'Patient added successfully' }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add patient' }), {
      status: 500,
    });
  }
}
