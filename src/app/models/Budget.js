// import mongoose from "mongoose";

// const BudgetSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   category: { type: String, required: true },
//   limit: { type: Number, required: true },
//   spent: { type: Number, default: 0 },
//   month: { type: Number, required: true },
//   year: { type: Number, required: true },
// });

// export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  year: { type: Number, required: true },
  month: {
    type: Number,
    required: function () {
      return this.type === "monthly";
    },
    min: 1,
    max: 12,
  },
  type: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true,
  },
});


// Optional: Add a schema-level validation to require month only if type is monthly
BudgetSchema.pre("validate", function (next) {
  if (this.type === "monthly" && (this.month === undefined || this.month === null)) {
    this.invalidate("month", "Month is required for monthly budgets");
  }
  next();
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);