import { Request, Response } from 'express';

import * as userService from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
    console.log('*********** post user controller');
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};
