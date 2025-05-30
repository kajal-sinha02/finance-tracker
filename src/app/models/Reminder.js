import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);
