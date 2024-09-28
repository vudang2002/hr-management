import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const User = model<IUser>('User', userSchema);

export default User;
export { IUser };