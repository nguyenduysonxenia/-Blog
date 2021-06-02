import express from "express";
import Post from "../models/post";
import TypePost from "../services/postService";
import * as StatusCode from "../constants/httpStatusCode";
import responseToClient from "../comon/response";
import { clear } from "console";
const MES_NO_POSTS = "There are no posts yet";
const MES_NOT_FOUND_POST = "Not found post";
const MES_CREATE_FAILED = "New post creation failed";
const MES_CREATE_SUCCES = "New post creation success";
const MES_UPDATE_FAILED = "Updation post failed";
const MES_DELETE_SUCCES = "Post deleted";
class PostController {
  getPostList = async (req: express.Request, res: express.Response) => {
    try {
      let posts: TypePost[] = await Post.find({
        actived: true,
        deleted: false,
      });
      if (posts.length == 0)
        return responseToClient(res, StatusCode.CODE_NOT_FOUND, MES_NO_POSTS);
      return responseToClient(res, StatusCode.CODE_SUCCESS, posts);
    } catch (error: any) {
      responseToClient(res, StatusCode.CODE_Exception, error.message);
    }
  };

  findOnePost = async (req: express.Request, res: express.Response) => {
    try {
      let post: TypePost = await Post.findById(req.params.id, {
        deleted: false,
      });
      if (!post)
        return responseToClient(
          res,
          StatusCode.CODE_NOT_FOUND,
          MES_NOT_FOUND_POST
        );
      return responseToClient(res, StatusCode.CODE_SUCCESS, post);
    } catch (error: any) {
      return responseToClient(res, StatusCode.CODE_Exception, error.message);
    }
  };

  createPost = async (req: express.Request, res: express.Response) => {
    let data_post: TypePost = req.body;
    let post = new Post(data_post);
    await post.save((error: any, result: any) => {
      if (error) {
        responseToClient(res, StatusCode.CODE_ERROR, MES_CREATE_FAILED);
      } else {
        return responseToClient(
          res,
          StatusCode.CODE_SUCCESS,
          MES_CREATE_SUCCES
        );
      }
    });
  };

  updatePost = async (req: express.Request, res: express.Response) => {
    try {
      let post: TypePost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!post)
        return responseToClient(
          res,
          StatusCode.CODE_NOT_FOUND,
          MES_UPDATE_FAILED
        );
      return responseToClient(res, StatusCode.CODE_SUCCESS, post);
    } catch (error: any) {
      responseToClient(res, StatusCode.CODE_Exception, error.message);
    }
  };

  deletePost = async (req: express.Request, res: express.Response) => {
    try {
      let post = await Post.findById(req.params.id);
      await Post.findOneAndUpdate(
        { _id: post.id },
        { $set: { deleted: true } },
        { returnOriginal: false }
      );
      return responseToClient(res, StatusCode.CODE_SUCCESS, MES_DELETE_SUCCES);
    } catch (error) {
      responseToClient(res, StatusCode.CODE_Exception, error.messsage);
    }
  };
}

export default new PostController();
