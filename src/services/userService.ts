import mongoose, { Date } from 'mongoose';
export default interface User{
  _id: mongoose.Types.ObjectId,
  username: string,
  avatar: string | null,
  email: string,
  pasword: string,
  createdAt: Date,
  updatedAt: Date,
  deleted: boolean,
  admin: boolean
}
