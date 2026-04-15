import { Router, Request, Response, NextFunction } from 'express';
import CustomError from "../../custom-error";
import { updateUserScore } from "../../controllers/jwt/user.controller";
import { authenticate } from '../../middleware/jwt/auth.middleware';

const router = Router();

router.put("/update-score", authenticate, updateUserScore);

router.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

export default router;