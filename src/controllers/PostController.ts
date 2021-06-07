import express from "express";
import Post from "../models/post";
import TypePost from "../services/postService";
import * as StatusCode from "../constants/httpStatusCode";
import mongoose from "mongoose"
import responseToClient from "../comon/response";
const MES_NO_POSTS = "There are no posts yet";
const MES_NOT_FOUND_POST = "Not found post";
const MES_CREATE_FAILED = "New post creation failed";
const MES_CREATE_SUCCES = "New post creation success";
const MES_UPDATE_FAILED = "Updation post failed";
const MES_DELETE_SUCCES = "Post deleted";
class PostController {
  getPostList = async (req: express.Request, res: express.Response) => {
    try {
      const result = res.paginatedResults;
      return responseToClient(res, StatusCode.CODE_SUCCESS, result);
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
    try{
      let image = req.file ? req.file : null;
      let post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: image?.filename
      });
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
    }catch(error: any){
      responseToClient(res, StatusCode.CODE_Exception, error.message);
    }
  };

  updatePost = async (req: express.Request, res: express.Response) => {
    try {
      const image = req.file;
      const title = req.body.title;
      const content = req.body.content;
      let post = await Post.findById(req.params.id);
      if(post){
        let result: TypePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            title: title ? title : post.title,
            content: content ? content : post.content,
            image: image ? image.filename : post.image
          },
          { new: true }
        );
        if (!result)
          return responseToClient(
            res,
            StatusCode.CODE_NOT_FOUND,
            MES_UPDATE_FAILED
          );
        return responseToClient(res, StatusCode.CODE_SUCCESS, result);
      }
      else{
        responseToClient(res, StatusCode.CODE_NOT_FOUND, MES_NOT_FOUND_POST);
      }

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
    } catch (error: any) {
      responseToClient(res, StatusCode.CODE_Exception, error.messsage);
    }
  };
  search = async(req: express.Request, res: express.Response)=>{
    const query: any = req.query.key;
    console.log(query)
    let posts = await Post.find({
      title: new RegExp('^'+query+'$', 'i')
    })
    responseToClient(res, StatusCode.CODE_SUCCESS, posts);
  }
  like = async(req: express.Request, res: express.Response)=>{
    try{
      const idPost: string = req.params.id;
      let post = await Post.findById(idPost);
      let idCurrentUser = req.currentUser.id;
      if(!post){
        return responseToClient(res, StatusCode.CODE_NOT_FOUND, MES_NOT_FOUND_POST );
      }
      let isLiked = post.likes.findIndex((u: mongoose.Types.ObjectId)=>u.toString() == idCurrentUser.toString());
      let result = null;
      console.log(isLiked)
      if(isLiked != -1){
        result = await Post.findOneAndUpdate({_id: post._id},{
          $pull:{
            likes: mongoose.Types.ObjectId(idCurrentUser)
          }
        },{ new: true})
      }
      else{
        result = await Post.findOneAndUpdate({_id: post._id},{
          $push:{
            likes: mongoose.Types.ObjectId(idCurrentUser)
          }
        },{ new: true})
      }
      return responseToClient(res, StatusCode.CODE_SUCCESS, result );
    }catch(err: any){
      responseToClient(res, StatusCode.CODE_Exception, err.message );
    }
  }
  view = async(req: express.Request, res: express.Response)=>{
    try{
      const idPost: string = req.params.id;
      let post = await Post.findById(idPost);
      let countView = post.views;
      if(!post){
        return responseToClient(res, StatusCode.CODE_NOT_FOUND, MES_NOT_FOUND_POST );
      }
        let result = await Post.findOneAndUpdate({_id: post._id},{
          views: countView + 1
        },{ new: true})
      return responseToClient(res, StatusCode.CODE_SUCCESS, result );
    }catch(err: any){
      responseToClient(res, StatusCode.CODE_Exception, err.message );
    }
  }
}

export default new PostController();
