import { FaTrash, FaEdit } from "react-icons/fa";
import { MdAutorenew } from "react-icons/md"; // Import icon for recurring
import { format, addDays, addMonths, addYears } from "date-fns"; // Import date functions

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faPlusCircle,
  faFolder,
  faWallet,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function ExpensesList({ expenses, onDelete, onEdit }) {
  return (
    <div className="p-6 bg-[black]">
      <h2 className="text-xl px-6 font-medium mb-8">Your Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.map((exp) => {
          const expenseDate = format(new Date(exp.date), "dd MMM yyyy");

          let nextRecurringDate = null;
          if (exp.isRecurring) {
            const lastDate = new Date(exp.date);
            if (exp.recurrenceType === "daily") {
              nextRecurringDate = format(addDays(lastDate, 1), "dd MMM yyyy");
            } else if (exp.recurrenceType === "weekly") {
              nextRecurringDate = format(addDays(lastDate, 7), "dd MMM yyyy");
            } else if (exp.recurrenceType === "monthly") {
              nextRecurringDate = format(addMonths(lastDate, 1), "dd MMM yyyy");
            } else if (exp.recurrenceType === "yearly") {
              nextRecurringDate = format(addYears(lastDate, 1), "dd MMM yyyy");
            }
          }

          return (
            <div
              key={exp._id}
              className="bg-black text-white p-6 rounded-2xl shadow-lg border border-gray-700 backdrop-blur-md"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-200">{exp.category}</span>
                <span className="text-xl font-bold text-green-400">₹{exp.amount}</span>
              </div>

              <p className="mt-2 text-gray-400">{exp.description}</p>

              {/* Expense Date */}
              <p className="mt-2 text-gray-400 text-sm">📅 Date: {expenseDate}</p>

              {/* Recurring or Non-Recurring Info */}
              <div className="mt-2 text-sm font-semibold flex items-center gap-2">
                <MdAutorenew size={16} className="text-yellow-400" />
                {exp.isRecurring ? (
                  <div className="text-yellow-400">
                    <p>Recurring ({exp.recurrenceType})</p>
                    {nextRecurringDate && (
                      <p className="text-sm font-normal text-yellow-300">
                        Next: {nextRecurringDate}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400">Non-Recurring</p>
                )}
              </div>

              {/* Receipt Image */}
              {exp.receipt && (
                <div className="mt-3">
                  <img
                    src={exp.receipt}
                    alt="Receipt"
                    className="w-full h-32 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              )}

              {/* Edit & Delete Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => onEdit(exp)}
                  className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => onDelete(exp._id)}
                  className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
