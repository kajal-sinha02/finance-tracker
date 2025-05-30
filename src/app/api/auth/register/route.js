import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import JWT
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use a secure secret key

export async function POST(req) {
  await connectDB();
  const { name, email, password } = await req.json();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({ name, email, password: hashedPassword });

  // Generate JWT token
  const authToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return NextResponse.json({ success: true, user, token: authToken });
}
