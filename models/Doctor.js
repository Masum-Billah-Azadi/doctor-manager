import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String, default: "" }, // for Google profile picture (optional)
  address: { type: String, default: "" },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
    default: "",
  },
  password: { type: String, required: false }, // required: false for Google-auth users
  provider: {
    type: String,
    enum: ["google", "manual"],
    default: "manual",
  },
}, { timestamps: true });

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
export default Doctor;