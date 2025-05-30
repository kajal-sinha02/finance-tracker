import { connectDB } from "../../../lib/mongodb";
import RecurringExpense from "../../../models/RecurringExpense";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { userId, category, amount, startDate, frequency } = await req.json();

  const recurringExpense = await RecurringExpense.create({ userId, category, amount, startDate, frequency });

  return NextResponse.json({ success: true, recurringExpense });
}
