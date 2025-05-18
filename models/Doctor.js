// models/Doctor.js
import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  password: String,
});

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
