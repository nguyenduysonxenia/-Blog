import User from '../models/user';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as StatusCode from '../constants/httpStatusCode';
import responseToClient from '../comon/response';

const MESSAGE_CREATE_SUCCESS = 'Account successfully created';
const MESSAGE_EMAIL_EXISTS = 'Email already exists';
const MESSAGE_CREATE_FAILURE = 'Created at account failure';
const MESSAGE_INCORRECT_PASSWORD = 'Incorrect password';
const MESSAGE_EMAIL_ISNOT_REGISTER = 'Email is not registered';
class UsersController{
  index(req: express.Request, res: express.Response){
    let email: string = req.body.email;
    let password: string  = req.body.password;
    User.findOne({email:email},function(err: any, user: any){
      if(user != null){
        bcrypt.compare(password,user.password,function(err: any,isVerify: any){
          if(isVerify){
            var accessToken: string = jwt.sign({email: user._id}, (<string>process.env.SECRECT_KEY))
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
}

export default new UsersController;
