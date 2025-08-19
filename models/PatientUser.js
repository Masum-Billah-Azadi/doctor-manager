import mongoose from "mongoose";

const PatientUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true, // signup এর সময় লাগবে
    },
  },
  { timestamps: true }
);

// ✅ পুনরায় model রেজিস্টার না করার জন্য চেক
export default mongoose.models.PatientUser ||
  mongoose.model("PatientUser", PatientUserSchema);
