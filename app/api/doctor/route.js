import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Doctor from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doctor = await Doctor.findOne({ email: session.user.email });
  return NextResponse.json(doctor);
}

export async function PUT(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  try {
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { email: session.user.email },
      data,
      { new: true }
    );

    return NextResponse.json(updatedDoctor);
  } catch (error) {
    return NextResponse.json({ error: "Update failed", details: error.message }, { status: 500 });
  }
}
