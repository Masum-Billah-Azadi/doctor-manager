<<<<<<< HEAD
=======
// models/Patient.js
>>>>>>> 73417577dec493477156b1aa73d13ac556e62453
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
<<<<<<< HEAD
  gender: String,
  contact: String,
  address: String,
  medicalHistory: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },// link to doctor
  patientNumber: { type: Number, required: true }, // auto-incremented per doctor
=======
  contact: String,
  medicine: String,
>>>>>>> 73417577dec493477156b1aa73d13ac556e62453
});

export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);
