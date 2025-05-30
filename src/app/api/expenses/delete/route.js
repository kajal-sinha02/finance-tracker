import { connectDB } from "../../../lib/mongodb";
import Expense from "../../../models/Expense";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectDB();

    // Extract the expense ID from the request URL
    const { searchParams } = new URL(req.url);
    const expenseId = searchParams.get("id");

    if (!expenseId) {
      return NextResponse.json({ success: false, message: "Expense ID is required" }, { status: 400 });
    }

    // Find and delete the expense
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return NextResponse.json({ success: false, message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
