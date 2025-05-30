"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faPen,
  faPlus,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
const monthNames = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


export default function Budget() {
  const [userId, setUserId] = useState(null);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [newExpenses, setNewExpenses] = useState({});
  const [budgets, setBudgets] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [editMode, setEditMode] = useState(null);
  const [newLimit, setNewLimit] = useState("");
  const [budgetType, setBudgetType] = useState("monthly");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchBudget = async () => {
      try {
        const res = await fetch(`/api/budgeting/budget?userId=${userId}&month=${month}&year=${year}`);
        const data = await res.json();
        setBudgets(data.budgets || []);
      } catch (error) {
        console.error("Failed to fetch budgets", error);
      }
    };

    fetchBudget();
  }, [userId, month, year]);

  const handleSetBudget = async () => {
    if (!userId || !category || !limit) return alert("Please fill in all fields!");

    try {
      const res = await fetch("/api/budgeting/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          category,
          limit,
          spent: 0,
          month: budgetType === "monthly" ? month : null,
          type: budgetType,
          year,
        }),
      });

      if (res.ok) {
        alert("Budget Set!");
        setCategory("");
        setLimit("");
        setBudgets([...budgets, { _id: Date.now(), category, limit, spent: 0, month: budgetType === "monthly" ? month : null, year }]);
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to set budget", error);
    }
  };

  const handleExpenseChange = (budgetId, value) => {
    setNewExpenses((prev) => ({ ...prev, [budgetId]: value }));
  };

  const handleAddExpense = async (budgetId, category, currentSpent) => {
    if (!userId || !newExpenses[budgetId]) return;

    const expenseToAdd = parseInt(newExpenses[budgetId]);
    const budget = budgets.find((b) => b._id === budgetId);
    if (!budget) return;

    const updatedSpent = currentSpent + expenseToAdd;
    if (updatedSpent > budget.limit) {
      const remaining = budget.limit - currentSpent;
      alert(`You can only add ₹${remaining} more to this category.`);
      return;
    }

    try {
      const res = await fetch("/api/budgeting/budget", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, category, spent: updatedSpent, month: budget.month, year }),
      });

      if (res.ok) {
        alert("Expense Added!");
        setNewExpenses((prev) => ({ ...prev, [budgetId]: "" }));
        setBudgets(budgets.map((b) => b._id === budgetId ? { ...b, spent: updatedSpent } : b));
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to add expense", error);
    }
  };

  const handleEditBudget = (budget) => {
    setEditMode(budget._id);
    setNewLimit(budget.limit);
  };

  const handleUpdateBudget = async (budgetId, category) => {
    if (!userId || !newLimit) return;

    try {
      const res = await fetch("/api/budgeting/budget", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, category, limit: newLimit, month, year }),
      });

      if (res.ok) {
        alert("Budget Updated!");
        setEditMode(null);
        setBudgets(budgets.map((b) => (b._id === budgetId ? { ...b, limit: newLimit } : b)));
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to update budget", error);
    }
  };

const handleDeleteBudget = async (budgetId, category, month, year) => {
  if (!window.confirm("Are you sure you want to delete this budget?")) return;

  const query = new URLSearchParams({
    userId,
    category,
    month: month?.toString() ?? "",
    year: year.toString(),
  }).toString();

  try {
    const res = await fetch(`/api/budgeting/budget?${query}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Budget Deleted!");
      setBudgets(budgets.filter((b) => b._id !== budgetId));
    } else {
      const errorData = await res.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error("Failed to delete budget", error);
  }
};

  return (
    <>
      <Navbar />
      <div className="pt-10 px-6">
        <div className="mt-6 bg-black p-6 shadow-lg text-white rounded-md">
          <h2 className="text-xl font-medium mb-4">Add a Budget</h2>

          {/* Budget Type Selector */}
          <select
            value={budgetType}
            onChange={(e) => setBudgetType(e.target.value)}
            className="w-full p-2 mb-4 bg-[#151B23] rounded-md text-white"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          {/* Month Selector (only if monthly) */}
          {budgetType === "monthly" && (
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full p-2 mb-4 bg-[#151B23] rounded-md text-white"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          )}

          {/* Year Selector */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full p-2 mb-4 bg-[#151B23] rounded-md text-white"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 bg-[#151B23] rounded-md text-white"
          />
          <input
            type="number"
            placeholder="Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full p-2 mb-4 bg-[#151B23] rounded-md text-white"
          />

          <button
            onClick={handleSetBudget}
            className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Set Budget
          </button>
        </div>

        {/* Display Budgets */}
        <div className="mt-10 space-y-4">
  {budgets.length > 0 ? (
    budgets.map((b) => (
      <div
        key={b._id}
        className="flex flex-col md:flex-row md:items-center justify-between bg-[#151B23] p-4 rounded-xl text-gray-200 shadow-md border border-gray-700"
      >
        {editMode === b._id ? (
          <div className="flex items-center gap-3 w-full">
            <input
              type="number"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              className="w-28 p-2 bg-[#1e2734] text-white rounded-md border border-gray-600 focus:outline-none"
            />
            <button
              onClick={() => handleUpdateBudget(b._id, b.category)}
              className="text-blue-400 text-2xl hover:text-blue-300"
              title="Update Budget"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col gap-1">
              <div className="text-sm text-gray-400 flex items-center gap-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-yellow-300" />
                {b.month !== null && b.month !== undefined
                  ? `${monthNames[b.month]} ${b.year} , ${b.category}`
                  : `Yearly - ${b.year}`}
              </div>
              <div className="text-lg font-semibold">{b.category}</div>
            </div>

            <div className="flex-1 text-center text-blue-400 font-medium">
              ₹{b.spent} / ₹{b.limit}
            </div>

            <div className="flex gap-2 items-center flex-1 justify-end">
              <input
                type="number"
                placeholder="Enter Expense"
                value={newExpenses[b._id] || ""}
                onChange={(e) => handleExpenseChange(b._id, e.target.value)}
                className="w-28 p-2 bg-[#1e2734] text-white rounded-md border border-gray-600 focus:outline-none"
              />

              <button
                onClick={() => handleAddExpense(b._id, b.category, b.spent)}
                className="text-green-400 text-xl hover:text-green-300"
                title="Add Expense"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>

              <button
                onClick={() => handleEditBudget(b)}
                className="text-yellow-400 text-xl hover:text-yellow-300"
                title="Edit Budget"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>

              <button
                onClick={() => handleDeleteBudget(b._id, b.category, b.month, b.year)}
                className="text-red-500 text-xl hover:text-red-400"
                title="Delete Budget"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </>
        )}
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center">No budgets set yet.</p>
  )}
</div>
      </div>
    </>
  );
}
