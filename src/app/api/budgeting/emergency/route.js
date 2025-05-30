import {connectDB} from "../../../lib/mongodb";
import EmergencyFund from "../../../models/EmergencyFund";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { userId, targetAmount } = req.body;
      const fund = new EmergencyFund({ userId, targetAmount });
      await fund.save();
      res.json({ success: true, fund });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
