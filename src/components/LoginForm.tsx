"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import backgroundImage from "../assets/backgroundImage.png";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Normalize email to lowercase for case-insensitive check
    const normalizedEmail = formData.email.trim().toLowerCase();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password: formData.password }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Login failed");

      if (result.token) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userId", result.userId);
        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[black]">
      <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto px-8 py-10 text-white">
        <h2 className="block text-2xl font-[cursive] font-medium mb-8">
          Sign in to use financeBuddy
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-6" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="mail@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 bg-[#1e293b] border border-[#334155] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-[#1e293b] border border-[#334155] rounded-md text-white placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 text-gray-400 text-sm select-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Keep logged in and Forgot password */}
          <div className="flex items-center justify-end text-sm text-gray-300">
            {/* Removed Keep me logged in checkbox */}
            <a href="/forgot-password" className="text-violet-400 hover:underline">
              Forgot password?
            </a>
          </div>


          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6A5EFE] hover:bg-[#BDC2FF] transition py-2 rounded-lg font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>
      </div>
      <div
        className="hidden md:block md:w-[60%] relative overflow-hidden rounded-bl-[200px] bg-white bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white text-center p-10">
          {/* Optional overlay or content here */}
        </div>
      </div>
    </div>
  );
}
