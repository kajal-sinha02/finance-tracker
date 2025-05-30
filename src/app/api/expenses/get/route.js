import { connectDB } from "../../../lib/mongodb";
import Expense from "../../../models/Expense";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    // Extract query parameters correctly
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    return NextResponse.json({ success: true, expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
