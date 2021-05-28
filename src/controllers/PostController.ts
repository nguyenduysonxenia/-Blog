import express from 'express';
import Post from '../models/post';
import TypePost from '../services/postService';

class PostController{
    getPostList = async(req: express.Request, res: express.Response) => {
        try {
            let posts: TypePost = await Post.find({});
            if(!posts) return res.json({status: 'error', message: "Not found posts"})
            return res.json({
                status:'success',
                message: 'All post',
                posts
              })
        } catch (error: any) {
            res.json({status: 'error', message: error.message})
        }
    }

    findOnePost = async(req: express.Request, res: express.Response) => {
        try{
            let post: TypePost =  await Post.findById(req.params.id);
            if(!post) return res.json({status: 'error', message: 'Not found post'})
            return res.json({
                status:'success',
                message: 'post',
                post
              })
        }catch(error: any){
            res.json({status: 'error', message: error.message})
        }
    }

    createPost = async (req: express.Request, res: express.Response) => {
        let data_post: TypePost = req.body
        let post = new Post(data_post);
        post.save((error: any, result: any) => {
            if(error){
                res.json({status: 'error', message: error.message})
            }else{
                return res.json({
                    status:'success',
                    message: 'New post created',
                    result
                  })
            }
        })
    }

    updatePost = async(req: express.Request, res: express.Response) => {
        try{
            let post: TypePost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!post) return res.json({status: 'error', message: "Not found post"})
            return res.json({
                status:'success',
                message: 'New post updated',

              })
        }catch(error: any){
            res.json({status: 'error', message: error.message})
        }
    }

    deletePost = async(req: express.Request, res: express.Response) => {
        try {
            let post = await Post.findByIdAndDelete(req.params.id);
            if(!post) return res.json({status: 'error', message: "Not found post"})
            return res.json({
                status:'success',
                message: 'This post is deleted!'                
              })
        } catch (error) {
            res.json({status: 'error', message: error.message})
        }
    }
}

export default new PostController;