import mongoose, { Schema } from "mongoose";

const post = new Schema(
  {
    author: mongoose.Types.ObjectId,
    category: mongoose.Types.ObjectId,
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    likes: [mongoose.Types.ObjectId],
    views: {
      type: Number,
      default: 0,
    },
    comments: [mongoose.Types.ObjectId],
    deleted: {
      type: Boolean,
      default: false,
    },
    actived: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", post);
