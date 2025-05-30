import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { generateResetToken } from "../../../lib/jwt";
import { sendResetEmail } from "../../../lib/nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const token = generateResetToken(email);

    // ✅ Get the base URL from env
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    // ✅ Construct full reset link
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    // ✅ Pass full link to the email
    await sendResetEmail(email, token);

    return new Response(JSON.stringify({ message: "Reset email sent" }), { status: 200 });
  } catch (error) {
    console.error("Reset email error:", error);
    return new Response(JSON.stringify({ message: "Error sending reset email" }), { status: 500 });
  }
}
