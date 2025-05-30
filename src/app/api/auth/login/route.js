import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ success: true, token, userId: user.id }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
