import { useState } from "react";
import { Home, User, Settings, Menu, Moon, Sun } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            isOpen ? "w-64" : "w-20"
          } h-screen bg-gray-900 text-white transition-all duration-300 p-4 flex flex-col`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mb-4 p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                <Home className="w-6 h-6" />
                {isOpen && <span>Dashboard</span>}
              </li>
              <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                <User className="w-6 h-6" />
                {isOpen && <span>Profile</span>}
              </li>
              <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                <Settings className="w-6 h-6" />
                {isOpen && <span>Settings</span>}
              </li>
            </ul>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome to the Dashboard
          </h1>
          <p>heyyy</p>
        </div>
      </div>
    </div>
  );
}
