import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const doctors = await Doctor.find({}, { password: 0 }).sort({ name: 1 });
  return NextResponse.json(doctors);
}
