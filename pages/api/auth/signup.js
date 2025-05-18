// pages/api/auth/signup.js
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, password, confirmPassword } = req.body;

  if (!name || !phone || !password || password !== confirmPassword) {
    return res.status(400).json({ error: 'Invalid input or passwords do not match.' });
  }

  try {
    await dbConnect();

    const existingDoctor = await Doctor.findOne({ phone });
    if (existingDoctor) return res.status(400).json({ error: 'Doctor already exists.' });

    const newDoctor = await Doctor.create({ name, phone, password });
    res.status(201).json({ message: 'Signup successful', doctorId: newDoctor._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
