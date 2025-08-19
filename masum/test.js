import dbConnect from '../../../lib/dbConnect';
import Patient from '../../../models/Patient';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Get the highest patientId from the existing patients
      const lastPatient = await Patient.findOne().sort({ patientId: -1 });

      // Assign next patientId (start from 1 if no patients exist)
      const newPatientId = lastPatient ? lastPatient.patientId + 1 : 1;

      // Add the new patientId to the request body
      const patient = await Patient.create({
        ...req.body,
        patientId: newPatientId,
      });

      res.status(201).json(patient);
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else if (req.method === 'GET') {
    try {
      const patients = await Patient.find({});
      res.status(200).json(patients);
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
