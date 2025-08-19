import dbConnect from "@/lib/dbConnect";
import PatientUser from "@/models/PatientUser";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("patient_token")?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 200 });

    let payload;
    try {
      payload = jwt.verify(token, process.env.PATIENT_JWT_SECRET);
    } catch {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const patient = await PatientUser.findById(payload.pid).select("-password");
    return NextResponse.json({ user: patient ?? null }, { status: 200 });
  } catch (error) {
    console.error("Error in patient-auth/me:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
