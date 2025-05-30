import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  totalSpent: { type: Number, required: true },
  topCategories: [{ category: String, amount: Number }], // Top spending categories
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
