import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
  await dbConnect();
  const { id } = await context.params;

  try {
    const { status } = await req.json();
    if (!["pending", "accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
