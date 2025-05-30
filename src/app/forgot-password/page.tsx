"use client";

import { useState } from "react";
import backgroundImage from "../../assets/backgroundImage.png";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage("Password reset link sent. Check your email.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto px-8 py-10 text-white">
        <h2 className="block text-2xl font-[cursive] font-medium mb-8">
          Enter your Email Address
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="mail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-[#1e293b] border border-[#334155] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {message && <p className="text-green-400 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6A5EFE] hover:bg-[#BDC2FF] transition py-2 rounded-lg font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-400">
          Remember your password?{" "}
          <a href="/login" className="text-violet-400 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
        <div
        className="hidden md:block md:w-[60%] relative overflow-hidden rounded-bl-[200px] bg-white bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white text-center p-10">
          {/* You can add some overlay text or effects here */}
        </div>
      </div>
    </div>
  );
}

