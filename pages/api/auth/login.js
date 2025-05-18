// pages/api/auth/login.js
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ error: 'Phone and password are required' });
  }

  try {
    await dbConnect();

    const doctor = await Doctor.findOne({ phone });
    if (!doctor || doctor.password !== password) {
      return res.status(401).json({ error: 'Invalid phone or password' });
    }

    res.status(200).json({ message: 'Login successful', doctorId: doctor._id, name: doctor.name });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
