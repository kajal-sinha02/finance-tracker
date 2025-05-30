import mongoose from "mongoose";

const EmergencyFundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  targetAmount: { type: Number, required: true },
  savedAmount: { type: Number, default: 0 },
});

export default mongoose.models.EmergencyFund || mongoose.model("EmergencyFund", EmergencyFundSchema);
