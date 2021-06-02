import express from 'express';

export default (res: express.Response, status: number,data: any)=>{
  return res.status(status).json(data)
}
