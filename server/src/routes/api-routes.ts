import { Router } from 'express';
import { z } from "zod";

/* creating schema for validation */
const schema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string()
});

const router = Router();

router.post("/login", (req, res) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error);
  }

  res.json({
    message: 'login successfull'
  });
});

export default router;