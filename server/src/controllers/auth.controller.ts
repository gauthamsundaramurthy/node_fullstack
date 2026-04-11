import { Request, Response } from "express";
import { getUserByEmailAndPassword } from "../services/user.service";
import { z } from "zod";

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

    // ✅ Set session
    (req.session as any).user = {
      email: user.email,
      isLoggedIn: true,
    };

    return res.json({
      message: "Login successful"
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  // 🔥 Step 1: Destroy session in store
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: 'Logout failed'
      });
    }

    // 🔥 Step 2: Clear cookie in browser
    res.clearCookie('connect.sid');

    return res.json({
      message: 'Logged out successfully'
    });
  });
};
