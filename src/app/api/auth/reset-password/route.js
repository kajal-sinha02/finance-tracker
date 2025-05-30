import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { verifyResetToken } from "../../../lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();
    await connectDB();
    console.log("hey");
    const { email } = verifyResetToken(token);
    console.log("hey");
    const hashed = await bcrypt.hash(newPassword, 10);

    await User.updateOne({ email }, { password: hashed });

    return new Response(JSON.stringify({ message: "Password reset successful" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error}), { status: 400 });
  }
}
