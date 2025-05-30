import { connectDB } from "../../../lib/mongodb";
import Budget from "../../../models/Budget";

// POST: Create or update a yearly budget
export async function POST(req) {
  await connectDB();
  try {
    const { userId, category, limit, year, spent = 0 } = await req.json();

    if (!userId || !category || !year) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    let budget = await Budget.findOne({ userId, category, year, type: "yearly" });

    if (budget) {
      budget.limit = limit;
    } else {
      budget = new Budget({ userId, category, limit, year, spent, type: "yearly" });
    }

    await budget.save();
    return Response.json({ success: true, budget });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch all yearly budgets for a user
export async function GET(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const year = searchParams.get("year");

    if (!userId || !year) {
      return Response.json({ error: "User ID and year are required" }, { status: 400 });
    }

    const budgets = await Budget.find({ userId, year, type: "yearly" }).select("category limit spent");
    return Response.json({ budgets: budgets || [] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Update a specific yearly budget
export async function PATCH(req) {
  await connectDB();
  try {
    const { userId, category, year, limit, spent } = await req.json();

    if (!userId || !category || !year) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const updateFields = {};
    if (limit !== undefined) updateFields.limit = limit;
    if (spent !== undefined) updateFields.spent = spent;

    const budget = await Budget.findOneAndUpdate(
      { userId, category, year, type: "yearly" },
      { $set: updateFields },
      { new: true }
    );

    if (!budget) return Response.json({ error: "Yearly budget not found" }, { status: 404 });
    return Response.json({ success: true, budget });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a specific yearly budget
export async function DELETE(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const category = searchParams.get("category");
    const year = searchParams.get("year");

    if (!userId || !category || !year) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const budget = await Budget.findOneAndDelete({ userId, category, year, type: "yearly" });

    if (!budget) return Response.json({ error: "Yearly budget not found" }, { status: 404 });
    return Response.json({ success: true, message: "Yearly budget deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
