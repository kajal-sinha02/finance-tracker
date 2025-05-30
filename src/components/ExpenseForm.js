import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import API from "../app/lib/api";

export default function ExpenseForm({ onExpenseAdded }) {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    description: "",
    isRecurring: false,
    recurrenceType: "monthly",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setExpense({ ...expense, isRecurring: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/expenses/add", {
        ...expense,
        userId: localStorage.getItem("userId"),
      });
      onExpenseAdded(data.expense);
      setExpense({
        category: "",
        amount: "",
        description: "",
        isRecurring: false,
        recurrenceType: "monthly",
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-[black] p-8 sm:p-12 rounded-lg shadow-lg mt-10">
        <h2 className="text-xl px-0 mt-5 font-medium">Add recurring or non-recurring expense</h2>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input
          type="text"
          name="category"
          value={expense.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="rounded-md bg-white/5 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
        />
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="rounded-md bg-white/5 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
        />
        <input
          type="text"
          name="description"
          value={expense.description}
          onChange={handleChange}
          placeholder="Description"
          className="rounded-md bg-white/5 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
        />

        {/* Recurring Expense Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="recurring"
            checked={expense.isRecurring}
            onChange={handleCheckbox}
            className="h-4 w-4 bg-[black] text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded mt-5"
          />
          <label htmlFor="recurring" className="text-white text-sm mt-5">Recurring Expense</label>
        </div>

        {/* Recurrence Type Dropdown (Only if Recurring is Checked) */}
        {expense.isRecurring && (
          <select
            name="recurrenceType"
            value={expense.recurrenceType}
            onChange={handleChange}
            className="rounded-md bg-black /5 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        )}

      <div className="flex justify-end">
  <button
    type="submit"
    className="flex items-center gap-1 rounded-md bg-indigo-500 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <PlusCircleIcon className="h-10 w-4" aria-hidden="true" />
    Expense
  </button>
</div>
      </form>
    </div>
  );
}
