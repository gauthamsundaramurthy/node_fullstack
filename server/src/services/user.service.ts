import { User } from "../models/user.model";

export const createUser = async (data: any) => {
  return await User.create(data);
};

export const getUsers = async () => {
  // return await User.find({}, {name: 1, _id: 0 });
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const updateScoreByEmail = async (email: string, score: number) => {
  const updatedUser = await User.findOneAndUpdate(
    { email: email },
    { $set: { score: score } },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

export const getUserByEmailAndPassword = async (email: string, password: string) => {
  const user = await User.findOne({ email, password });

  if (!user) return null;

  return user;
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};