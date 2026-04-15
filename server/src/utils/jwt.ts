import jwt from "jsonwebtoken";

const SECRET = "your-secret-key"; // move to env in real apps

export const generateToken = (payload: any) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};