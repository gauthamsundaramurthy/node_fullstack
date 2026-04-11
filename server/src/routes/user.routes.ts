import { Router, Request, Response, NextFunction } from 'express';
import { z } from "zod";
import CustomError from "../custom-error";
import * as userController from "../controllers/user.controller";
import { validate } from '../middleware/validate.middleware';

const router = Router();

function logger(req: Request, res: Response, next: NextFunction){
    console.log("User Router logger", req.ip, req.method, req.url, req.headers);
    next();
}

router.use(logger);

router.get("/:id", (req, res) => {

  if (req.params.id !== "1") {
    throw new CustomError("User not found", 404);
  }

  res.send(`User ID: ${req.params.id}`);
});

router.get("/:id/posts/:postId", (req, res) => {
  res.json(req.params);
});

router.get("/", userController.getUsers);

export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
  age: z.number().min(18)
});

router.post("/", validate(userSchema), userController.createUser);

router.put("/update-score", userController.updateUserScore);

/* validation middleware

function validateUser(req: Request, res: Response, next: NextFunction) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  next();
}

router.post("/", validateUser, (req, res) => {
    console.log('parsing req json', req.body);
    const { name, age, email } = req.body;
    res.send({
        name,
        age, 
        email
    });
});
*/

router.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

export default router;