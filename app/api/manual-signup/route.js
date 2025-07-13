import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();
  const { name, email, phone, password } = await req.json();

  const existing = await Doctor.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newDoctor = await Doctor.create({ name, email, phone, password: hashedPassword });

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
