import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  address: String,
  medicalHistory: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);
