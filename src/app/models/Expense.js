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
  nextDueDate: { type: Date }, // Auto-updated after each recurrence
});

// ✅ Prevent Overwriting the Model in Next.js
module.exports = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
