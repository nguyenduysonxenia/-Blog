import Comment from '../models/comment';
import User from '../models/user';
import Post from '../models/post';
import express from 'express';

class CommentsController{
  async index(req: express.Request, res: express.Response){
    let idPost = req.params.id;
    let users = await User.find({})
    let post = await Post.findById(idPost);
    if(!post) return res.status(404).send('not found post')
    let comments =  await Comment.find({id: {
      $in: post.comments
    }});



    res.json({
      status: 'success',
      comments
    })
  }
  create(req: express.Request,res: express.Response){
    let idPOst = req.params.id;
    let comment = new Comment({
      author: req.currentUser
    })
  }
}

export default new CommentsController;
