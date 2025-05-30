import { connectDB } from "../../../lib/mongodb";
import Expense from "../../../models/Expense";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  
  const { userId, category, amount, description, isRecurring, recurrenceType } = await req.json();
  
  const expense = await Expense.create({
    userId,
    category,
    amount,
    description,
    isRecurring: isRecurring || false,  // Default to false if not provided
    recurrenceType: isRecurring ? recurrenceType : null, // Only store type if recurring
  });

  return NextResponse.json({ success: true, expense });
}
