import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No jwt token" });
  }

  try {
    const decoded = verifyToken(token);
    console.log('***** decoded -> ', decoded);
    // (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};