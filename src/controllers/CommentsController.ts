import { CODE_ERROR } from './../constants/httpStatusCode';
import Comment from '../models/comment';
import User from '../models/user';
import Post from '../models/post';
import TypeComment from '../services/commentService'
import TypeUser from '../services/userService'
import mongoose from 'mongoose';
import express from 'express';
import * as StatusCode from '../constants/httpStatusCode';
import responseToClient from '../comon/response';
const MESSAGE_NOT_FOUND_POST = 'Not found post';
const MESSAGE_COMMENT_FAILURE = 'Comment failed';
const MESSAGE_COMMENT_SUCCESS = 'Comment removed';
const MESSAGE_COMMENT_DELETED_FAILURE = 'Deleted comment failed';
const MESSAGE_NOT_FOUND_COMMENT = 'Not found comment';
class CommentsController{
  async index(req: express.Request, res: express.Response){
    try{
      const idPost:string = req.params.id;
      let post = await Post.findById(idPost);
      if(!post)
        return responseToClient(res, StatusCode.CODE_ERROR, MESSAGE_NOT_FOUND_POST);
      let users = await User.find({});
      let comments =  await Comment.find({
        $or: [
          {_id: {
            $in: post.comments
            }
          },
          {author: {
            $in: post.comments
          }}
        ]
      }).lean();
      comments = getInfoComment(users, comments);
      comments = getSubComment(comments);
      responseToClient(res, StatusCode.CODE_SUCCESS, comments);
    }catch(err){
      responseToClient(res, StatusCode.CODE_Exception, err.message);
    }
  }
  async create(req: express.Request,res: express.Response){
    try{
      let post = await Post.findById(req.params.id);
      let parentComment = null;
      let comment = await Comment.findById(req.body.parentComment);
      if(comment){
        parentComment = comment._id
      }
      if(post){
        let comment = new Comment({
          author: req.currentUser.id,
          content: req.body.content,
          parentComment: parentComment
        })
        if(comment.save()){
          Post.findOneAndUpdate({_id: post._id},{
            $push : {
              comments : comment._id
            }
          },{ rawResult: true}, function(err: any, post: any ) {
            if(post != null){
              return responseToClient(res, StatusCode.CODE_SUCCESS,comment);
            }
            return responseToClient(res, StatusCode.CODE_ERROR,MESSAGE_COMMENT_FAILURE);
          })
        }
      }
      else{
        responseToClient(res, StatusCode.CODE_ERROR,MESSAGE_NOT_FOUND_POST);
      }
    }catch(err){
      responseToClient(res, StatusCode.CODE_Exception,err.message);
    }
  }
  async destroy(req: express.Request, res: express.Response){
    try{
      let idComment: string = req.params.id;
      let comment = await Comment.findById(idComment);
      if(comment){
        let result = await Comment.deleteOne({_id: comment._id})
        if(result){
          await Comment.deleteMany({parentComment: comment._id});
          await Post.findOneAndUpdate({comments: comment._id},{
            $pull:{
              comments : comment._id
            }
          })
          return responseToClient(res, StatusCode.CODE_SUCCESS,MESSAGE_COMMENT_SUCCESS);
        }
        return responseToClient(res, StatusCode.CODE_ERROR,MESSAGE_COMMENT_DELETED_FAILURE)
      }
      else{
        return responseToClient(res, StatusCode.CODE_ERROR,MESSAGE_NOT_FOUND_COMMENT)
      }
    }catch(err){
      responseToClient(res, StatusCode.CODE_Exception,err.message)
    }
  }
  async update(req: express.Request, res: express.Response){
    try{
      let comment  = await Comment.findById(req.params.id);
      if(comment){
        let result = await Comment.findOneAndUpdate({_id: comment._id},{$set:{
          content: req.body.content
        }},{ returnOriginal: false },)
        responseToClient(res, StatusCode.CODE_SUCCESS,result)
      }
      else{
        return responseToClient(res, StatusCode.CODE_ERROR,MESSAGE_NOT_FOUND_COMMENT)
      }
    }catch(err){
      responseToClient(res, StatusCode.CODE_Exception,err.message)
    }
  }

}
function getInfoComment(users: TypeUser[],comments: TypeComment[]): TypeComment[]{
  let result = comments = comments.map((comment: TypeComment)=>{
    let index = users.findIndex((user: TypeUser) => user._id.toString() == comment.author.toString());
    comment.authorInfo = {
       name: users[index].username,
       avatar: users[index].avatar
    }
    return comment;
  })
  return result;
}

function getSubComment(comments: TypeComment[]){
  let results = comments.map((comment: TypeComment)=>{
    let subCmt = comments.filter((subcomment:TypeComment) => subcomment.parentComment != null && subcomment.parentComment.toString() == comment._id.toString())
     comment.subComments = subCmt
     return comment;
  })
  return results.filter(comment=>comment.parentComment == null);
}
export default new CommentsController;
