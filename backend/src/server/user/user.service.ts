import User, { IUser } from './user.model';

const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
};