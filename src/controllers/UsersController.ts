import { CODE_SUCCESS } from './../constants/httpStatusCode';
import User from '../models/user';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as StatusCode from '../constants/httpStatusCode';
import responseToClient from '../comon/response';
import multer from 'multer';

const MESSAGE_CREATE_SUCCESS = 'Account successfully created';
const MESSAGE_EMAIL_EXISTS = 'Email already exists';
const MESSAGE_CREATE_FAILURE = 'Created at account failure';
const MESSAGE_INCORRECT_PASSWORD = 'Incorrect password';
const MESSAGE_EMAIL_ISNOT_REGISTER = 'Email is not registered';
const MESSAGE_UPDATE_FAILURE = 'Update failed';
const MESSAGE_UPDATE_PASSWORD_SUCCESS = 'Update password successfully';
const MESSAGE_UPDATE_PASSWORD_FAILURE = 'Update password successfully';
const MESSAGE_CURRENTPASSWORD_FAILURE = 'Current password is not correct';
const MESSAGE_NOT_FOUND_USER = 'Not found user';
const MESSAGE_DELETED_USER_SUCCESS = 'Deleted user successfully';
const MESSAGE_DELETED_USER_FAILURE = 'Deleted user failure';
class UsersController{
  index(req: express.Request, res: express.Response){
    let email: string = req.body.email;
    let password: string  = req.body.password;
    User.findOne({email:email},function(err: any, user: any){
      if(user != null){
        bcrypt.compare(password,user.password,function(err: any,isVerify: any){
          if(isVerify){
            var accessToken: string = jwt.sign({id: user._id}, (<string>process.env.SECRECT_KEY))
            res.header(accessToken,accessToken)
            responseToClient(res,StatusCode.CODE_SUCCESS,accessToken);
          }
          else{
            responseToClient(res, StatusCode.CODE_ERROR, MESSAGE_INCORRECT_PASSWORD);
          }
        })
      }
      else{
        responseToClient(res, StatusCode.CODE_ERROR, MESSAGE_EMAIL_ISNOT_REGISTER);
      }
    })
  }
  create(req: express.Request,res: express.Response){
    let username: string = req.body.username;
    let email: string = req.body.email;
    let password: string = req.body.password;
      User.findOne({email: email},function(err: any,user: any){
        if(user ==  null){
          bcrypt.hash(password, 10, function(err,hash){
            let user = new User({
              username,
              email,
              password: hash
            });
            if(user.save()){
             return responseToClient(res, StatusCode.CODE_SUCCESS, MESSAGE_CREATE_SUCCESS);
            }
            responseToClient(res, StatusCode.CODE_ERROR, MESSAGE_CREATE_FAILURE);
          })
        }
        else{
          responseToClient(res, StatusCode.CODE_ERROR, MESSAGE_EMAIL_EXISTS);
        }
      })
  }
  async update(req: express.Request, res: express.Response){
    try{
      const idUser = req.currentUser.id;
      let user = await User.findById(idUser);
      let username = req.body.username;
      let avatar = req.file;
      let result = await User.findOneAndUpdate({_id : idUser},{
        username: username ? username.trim() : user.username,
        avatar : avatar ? avatar.filename : user.avatar
      },{ new: true })
      if(result){
        return responseToClient(res,StatusCode.CODE_SUCCESS,result);
      }
      return responseToClient(res,StatusCode.CODE_ERROR,MESSAGE_UPDATE_FAILURE);
    }catch(error){
      responseToClient(res,StatusCode.CODE_Exception,error.message);
    }
  }
  async updatePassword(req: express.Request, res: express.Response){
    const idUser = req.currentUser.id;
    let user = await User.findById(idUser);
    const currentPassword: string = req.body.currentPassword;
    const newPassword: string = req.body.newPassword;
    const confirmPassword: string = req.body.confirmPassword;
    if(newPassword !== confirmPassword)
      return responseToClient(res,StatusCode.CODE_ERROR,MESSAGE_INCORRECT_PASSWORD);
    const validate_pasword = await bcrypt.compare(currentPassword,user.password);
    if(validate_pasword){
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
      let result = await User.findOneAndUpdate({_id : user.id},{
        password : hashPassword
      })
      if(result){
        return responseToClient(res,StatusCode.CODE_SUCCESS,MESSAGE_UPDATE_PASSWORD_SUCCESS);
      }
      responseToClient(res,StatusCode.CODE_ERROR,MESSAGE_UPDATE_PASSWORD_FAILURE);
    }
    else{
      responseToClient(res,StatusCode.CODE_ERROR,MESSAGE_CURRENTPASSWORD_FAILURE);
    }
  }
  async show(req: express.Request, res: express.Response){
    const idUser = req.currentUser.id;
    let user = await User.findById(idUser);
    return responseToClient(res,StatusCode.CODE_SUCCESS,user);
  }
  async destroy(req: express.Request, res: express.Response){
    try{
      const idUser = req.currentUser.id;
      let user = await User.findById(idUser);
      let userDelete = await User.findById(req.params.id);
      if(!userDelete){
        return responseToClient(res,StatusCode.CODE_NOT_FOUND,MESSAGE_NOT_FOUND_USER);
      }
      let result = await User.findOneAndUpdate({_id: userDelete._id},{
        deleted: true
      });
      if(result)
        return responseToClient(res,StatusCode.CODE_SUCCESS,MESSAGE_DELETED_USER_SUCCESS);
      return responseToClient(res,StatusCode.CODE_ERROR,MESSAGE_DELETED_USER_FAILURE);
    }catch(err){
      responseToClient(res,StatusCode.CODE_Exception,err.message);
    }
  }
  async search(req: express.Request, res: express.Response){
    const query: any = req.query.keysearch;
    let users = await User.find({
      username: new RegExp('^'+query.trim().toLowerCase().trim()+'$', 'i')
    })
    responseToClient(res,StatusCode.CODE_SUCCESS,users);
  }
}

export default new UsersController;
