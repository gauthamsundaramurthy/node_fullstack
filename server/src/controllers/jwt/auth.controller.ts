import { Request, Response } from "express";
import { z } from "zod";
import { getUserByEmailAndPassword } from "../../services/user.service";
import { generateToken } from '../../utils/jwt';

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginController = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error);
  }

  const { email, password } = result.data;

  try {
    const user = await getUserByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ email });

    // ✅ store in cookie (secure way)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    });

    return res.json({
      message: "Login successful"
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  // 🔥 Step 2: Clear cookie in browser
  res.clearCookie('token');

  return res.json({
    message: 'Logged out successfully'
  });
};
