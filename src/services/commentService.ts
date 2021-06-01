import mongoose, { Date } from 'mongoose';
export default interface Comment{
  _id: mongoose.Types.ObjectId,
  content: string,
  author: mongoose.Types.ObjectId,
  parentComment: mongoose.Types.ObjectId | string,
  createdAt: Date,
  updatedAt: Date,
  authorInfo: Object,
  subComments: Array<this>
}
