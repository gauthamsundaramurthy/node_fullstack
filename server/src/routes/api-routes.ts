import { Router, Request, Response, NextFunction } from 'express';
import { z } from "zod";

/* creating schema for validation */
const schema = z.object({
  email: z.string(),
  password: z.string(),
});

const router = Router();

function alreadyLoggedIn(req: Request, res: Response, next: NextFunction) {
  if((req.session as any).user) { // make sure client sends cookies
    res.status(200).json({ // TODO update correct status code
      message: 'User already logged in'
    })
  }  else {
    next(); 
  }
}

router.post("/login", alreadyLoggedIn, (req, res) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error);
  }

  const { email, password } = req.body;

  if (email === "gautham.oct3@gmail.com" && password === "password") {
    (req as any).session.user = { // TODO : avoid any type
      email,
      isLoggedIn: true,
    };

    return res.json({
      message: "Login successful"
    });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

export default router;