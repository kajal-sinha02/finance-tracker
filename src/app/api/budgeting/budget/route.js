// Backend: API Routes (/api/budgeting/budget)
import { connectDB } from "../../../lib/mongodb";
import Budget from "../../../models/Budget";

export async function POST(req) {
  await connectDB();
  try {
    const { userId, category, limit, month, year, spent = 0, type } = await req.json();

    // Build query conditionally
    const query = { userId, category, year };
    if (type === "monthly") {
      if (!month) {
        return Response.json({ error: "Month is required for monthly budgets" }, { status: 400 });
      }
      query.month = month;
    }

    let budget = await Budget.findOne(query);

    if (budget) {
      budget.limit = limit;
      budget.type = type; // update type if necessary
    } else {
      const newBudgetData = { userId, category, limit, year, spent, type };
      if (type === "monthly") {
        newBudgetData.month = month;
      }
      budget = new Budget(newBudgetData);
    }
    await budget.save();
    return Response.json({ success: true, budget });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}



export async function GET(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!userId) return Response.json({ error: "User ID is required" }, { status: 400 });

    const filter = { userId, month, year };
    const budgets = await Budget.find(filter).select("category limit spent");
    return Response.json({ budgets: budgets || [] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  await connectDB();
  try {
    const { userId, category, month, year, limit, spent } = await req.json();
    if (!userId || !category || !month || !year) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const updateFields = {};
    if (limit !== undefined) updateFields.limit = limit;
    if (spent !== undefined) updateFields.spent = spent;

    const budget = await Budget.findOneAndUpdate(
      { userId, category, month, year },
      { $set: updateFields },
      { new: true }
    );

    if (!budget) return Response.json({ error: "Budget not found" }, { status: 404 });
    return Response.json({ success: true, budget });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

//delete a budget
export async function DELETE(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    console.log("Received DELETE request with:", searchParams.toString()); // Debugging

    const userId = searchParams.get("userId");
    const category = searchParams.get("category");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!userId || !category || !month || !year) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const budget = await Budget.findOneAndDelete({ userId, category, month, year });

    if (!budget) return Response.json({ error: "Budget not found" }, { status: 404 });
    return Response.json({ success: true, message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

