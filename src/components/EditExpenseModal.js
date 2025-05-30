import { useState, useEffect } from "react";

export default function EditExpenseModal({ isOpen, onClose, expense, onSave }) {
  const [updatedExpense, setUpdatedExpense] = useState({
    id: "",
    amount: "",
    category: "",
    description: "",
    receipt: "",
  });

  useEffect(() => {
    if (expense) {
      setUpdatedExpense({
        id: expense._id, // Ensure ID is included
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        receipt: expense.receipt,
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    setUpdatedExpense({ ...updatedExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(updatedExpense);
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-96 shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">Edit Expense</h2>
        
        <input
          type="text"
          name="amount"
          value={updatedExpense.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
        />
        
        <input
          type="text"
          name="category"
          value={updatedExpense.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
        />
        
        <input
          type="text"
          name="description"
          value={updatedExpense.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
        />
        
        <input
          type="text"
          name="receipt"
          value={updatedExpense.receipt}
          onChange={handleChange}
          placeholder="Receipt URL"
          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
