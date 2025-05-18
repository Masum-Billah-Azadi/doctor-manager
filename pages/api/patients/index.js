// pages/api/patients/index.js
import dbConnect from '@/lib/dbConnect';
import Patient from '@/models/Patient';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const patients = await Patient.find({});
    return res.status(200).json(patients);
  }

  if (req.method === 'POST') {
    const patient = await Patient.create(req.body);
    return res.status(201).json(patient);
  }

  res.status(405).end(); // Method not allowed
}
