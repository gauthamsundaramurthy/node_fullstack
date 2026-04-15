import { Request, Response } from 'express';
import * as userService from "../../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const updateUserScore = async (req: Request, res: Response) => {
  try {
    const { email, score } = req.body;

    if (!email || score === undefined) {
      return res.status(400).json({
        message: "Email and score are required"
      });
    }

    if(!(req.session as any).user) {
        res.status(401).json({ message: "User does not exist" });
    }

    const updatedUser = await userService.updateScoreByEmail(email, score);

    return res.status(200).json({
      message: "Score updated successfully",
      data: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message
    });
  }
};