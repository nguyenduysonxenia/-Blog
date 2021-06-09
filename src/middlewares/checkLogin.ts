import User from '../models/user';
import express, { NextFunction, request } from 'express';
import jwt from 'jsonwebtoken';

export default (req: express.Request, res: express.Response, next: NextFunction)=>{
   let accessToken: any = req.header('accessToken');
   if(!accessToken)
      return res.status(401).send('accessToken Denied')
   try {
      let verified = jwt.verify(accessToken,<string>process.env.SECRECT_KEY);
      req.currentUser = verified;
      next();
   }catch(err){
      res.status(403).send('Invalid token');
   }
}
