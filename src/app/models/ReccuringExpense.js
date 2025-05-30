// import mongoose from "mongoose";

// const RecurringExpenseSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   category: { type: String, required: true },
//   amount: { type: Number, required: true },
//   startDate: { type: Date, required: true },
//   frequency: { type: String, enum: ["monthly", "yearly"], required: true }
// });

// export default mongoose.models.RecurringExpense || mongoose.model("RecurringExpense", RecurringExpenseSchema);
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  receipt: { type: String },
  date: { type: Date, default: Date.now },
  isRecurring: { type: Boolean, default: false },
  recurrenceType: { type: String, enum: ["daily", "weekly", "monthly", "yearly"], default: null },
  nextDueDate: { type: Date } // Auto-updated after each recurrence
});

module.exports = mongoose.model("Expense", expenseSchema);
