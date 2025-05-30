import {connectDB} from "../../../lib/mongodb";
import SavingsGoal from "../../../models/SavingsGoal";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { userId, name, targetAmount, deadline } = req.body;
      const goal = new SavingsGoal({ userId, name, targetAmount, deadline });
      await goal.save();
      res.json({ success: true, goal });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
