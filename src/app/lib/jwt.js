import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;


export function generateResetToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
}

// export const generateResetToken = (email) => {
//   return jwt.sign({ email }, SECRET, { expiresIn: "15m" });
// };

// export const verifyResetToken = (token) => {
//   return jwt.verify(token, SECRET);
// };
export function verifyResetToken(token) {
  try {
    // verify returns the decoded payload if valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // throw to be caught in your API route
    throw new Error("Invalid or expired token ");
  }
}