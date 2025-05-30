import {connectDB} from "../../../lib/mongodb";
import Budget from "../../../models/Budget";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { userId, category, limit, month, year } = req.body;
      let budget = await Budget.findOne({ userId, category, month, year });

      if (budget) {
        budget.limit = limit; // Update existing budget
      } else {
        budget = new Budget({ userId, category, limit, month, year });
      }

      await budget.save();
      res.json({ success: true, budget });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { userId, month, year } = req.query;
      const budgets = await Budget.find({ userId, month, year });
      res.json({ budgets });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
