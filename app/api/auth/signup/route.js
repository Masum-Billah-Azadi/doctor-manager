import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, phone, password } = await req.json();

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Signup successful", doctor });
  } catch (err) {
    return NextResponse.json({ error: "Signup failed", details: err.message }, { status: 500 });
  }
}
