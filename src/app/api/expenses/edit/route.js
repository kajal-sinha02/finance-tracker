import { connectDB } from "../../../lib/mongodb";
import Expense from "../../../models/Expense";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectDB();

    const { id, amount, category, description, receipt } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Expense ID is required" }, { status: 400 });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, description, receipt },
      { new: true } // Return updated document
    );

    if (!updatedExpense) {
      return NextResponse.json({ success: false, message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Expense updated successfully", expense: updatedExpense });
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
