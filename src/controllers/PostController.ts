import express from "express";
import Post from "../models/post";
import TypePost from "../services/postService";

class PostController {
  getPostList = async (req: express.Request, res: express.Response) => {
    try {
      const posts: [TypePost] = await Post.find({ actived: true });
      if (posts.length < 1)
        return res
          .status(204)
          .json({ status: "error", message: "No post yet" });
      return res.status(201).json({
        status: "success",
        message: "All post",
        posts,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ status: "error", message: "error failed to load data" });
    }
  };

  findOnePost = async (req: express.Request, res: express.Response) => {
    try {
      const post: TypePost = await Post.findById(req.params.id);
      if (!post)
        return res
          .status(201)
          .json({ status: "error", message: "Not found post" });
      return res.status(201).json({
        status: "success",
        message: "post",
        post,
      });
    } catch (error: any) {
      res.json({ status: "error", message: "error failed to load data" });
    }
  };

  createPost = async (req: express.Request, res: express.Response) => {
    try {
      const dataPostUpdate: TypePost = req.body;
      const post = new Post(dataPostUpdate);
      await post.save((error: any, result: any) => {
        if (error) {
          res
            .status(501)
            .json({ status: "error", message: "Post creation failed" });
        } else {
          return res.status(201).json({
            status: "success",
            message: "New post created",
            result,
          });
        }
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ status: "error", message: "Can't create new posts" });
    }
  };

  updatePost = async (req: express.Request, res: express.Response) => {
    try {
      const post: TypePost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!post)
        return res
          .status(501)
          .json({ status: "error", message: "Not found post" });
      return res.status(201).json({
        status: "success",
        message: "New post updated!",
      });
    } catch (error: any) {
      res.status(500).json({ status: "error", message: "Can't update posts" });
    }
  };

  deletePost = async (req: express.Request, res: express.Response) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post)
        return res
          .status(501)
          .json({ status: "error", message: "Not found post" });
      return res.status(201).json({
        status: "success",
        message: "This post is deleted!",
      });
    } catch (error: any) {
      res.status(500).json({ status: "error", message: "Can't delete posts" });
    }
  };
}

export default new PostController();
