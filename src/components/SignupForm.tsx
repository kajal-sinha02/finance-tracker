"use client"; // Ensures it's a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import signupImage from "../assets/backgroundImage.png";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log("signup Response:", result);

      if (!response.ok) throw new Error(result.message || "Login failed");

      if (result.authToken) {
        localStorage.setItem("authToken", result.authToken);
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* Left side: form + title */}
      <div className="flex flex-col justify-center w-1/2 px-10 py-12 text-white">
        <h2 className="text-2xl font-[cursive] font-medium mb-8">
          Sign up for an account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-100 rounded-md bg-gray-800 px-3 py-2 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-100 rounded-md bg-gray-800 px-3 py-2 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-100 rounded-md bg-gray-800 px-3 py-2 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-100 rounded-md bg-gray-800 px-3 py-2 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-100 flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>

      {/* Right side: image */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden rounded-bl-[200px] bg-white bg-cover bg-center">
        <img
          src={signupImage.src}
          alt="Sign Up"
          className="object-cover w-full h-full"
          draggable={false}
        />
      </div>
    </div>
  );
}
