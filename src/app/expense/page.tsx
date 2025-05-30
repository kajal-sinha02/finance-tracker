"use client";
import { useState, useEffect } from "react";
import ExpenseForm from "../../components/ExpenseForm";
import ExpensesList from "../../components/ExpenseList";
import EditExpenseModal from "../../components/EditExpenseModal";
import Navbar from '@/components/Navbar';
import API from "../../app/lib/api";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const { data } = await API.get(`/expenses/get?userId=${localStorage.getItem("userId")}`);
      setExpenses(data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleExpenseAdded = async (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    try {
      await API.post("/expenses/add", newExpense);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await API.delete(`/expenses/delete?id=${expenseId}`);
      setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp._id !== expenseId));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleSaveExpense = async (updatedExpense) => {
    try {
      const { data } = await API.patch("/expenses/edit", updatedExpense);

      if (data.success) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((exp) =>
            exp._id === updatedExpense.id ? { ...exp, ...updatedExpense } : exp
          )
        );
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      <ExpensesList expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditExpense} />
      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        expense={editingExpense}
        onSave={handleSaveExpense}
      />
    </div>
  );
}
