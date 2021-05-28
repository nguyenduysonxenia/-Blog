import express from "express";
import * as StatusCode from '../constants/httpStatusCode';
import responseToClient from '../comon/response';
const PASSWORD_ERROR_LENGTH = 'password must have at least 6 characters';
const USERNAME_ERROR_LENGTH = 'username must have at least 6 characters';
const EMAIL_ERROR = 'Invalid email';
const PASSWORD_INCORRECT = 'password incorrect';

export default (req: express.Request ,res: express.Response, next: express.NextFunction)=>{
  let errors: string[] = [];
  const regexEmail: RegExp = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  let isMatch: boolean = regexEmail.test(req.body.email)
  if(req.body.username.trim().length < 6 )
    errors.push(USERNAME_ERROR_LENGTH);
  if(req.body.password.trim().length < 6 )
    errors.push(PASSWORD_ERROR_LENGTH);
  if(!isMatch)
    errors.push(EMAIL_ERROR);
  if(req.body.password.toString() != req.body.confirmPassword.trim().toString())
    errors.push(PASSWORD_INCORRECT);
  if(errors.length > 0)
    return responseToClient(res, StatusCode.CODE_ERROR, errors);
  next();
}
