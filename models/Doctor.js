import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  address: String,
  phone: { type: String, default: null },
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
