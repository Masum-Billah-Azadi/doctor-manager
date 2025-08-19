import dbConnect from "@/lib/dbConnect";
import PatientUser from "@/models/PatientUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const exists = await PatientUser.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return NextResponse.json({ error: "Email or phone already registered" }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await PatientUser.create({ name, email, phone, password: hash });

    // auto-login (set cookie)
    const token = jwt.sign({ pid: user._id }, process.env.PATIENT_JWT_SECRET, { expiresIn: "7d" });

    const cookieStore = await cookies();
    cookieStore.set("patient_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/", // সব রুটে অ্যাক্সেস থাকবে
    });


    return NextResponse.json({ ok: true, user: { id: user._id, name: user.name } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
