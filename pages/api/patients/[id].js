// pages/api/patients/[id].js
import dbConnect from '@/lib/dbConnect';
import Patient from '@/models/Patient';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(patient);
  }

  if (req.method === 'PUT') {
    const updated = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await Patient.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).end();
}
