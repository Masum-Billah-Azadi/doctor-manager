import dbConnect from "@/lib/dbConnect";
import PatientUser from "@/models/PatientUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const { phoneOrEmail, password } = await req.json();
    if (!phoneOrEmail || !password) {
      return NextResponse.json({ error: "Phone/Email and password required" }, { status: 400 });
    }

    const user = await PatientUser.findOne({
      $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }],
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

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
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
