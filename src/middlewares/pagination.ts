
import express from "express";
import * as StatusCode from '../constants/httpStatusCode';
import responseToClient from '../comon/response';
interface Result {
  next:object | undefined ,
  previous:object | undefined,
  results: []
}
export default (model: any)=>{

  return  async(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>=>{
    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let result: Result={
      next: undefined ,
      previous: undefined ,
      results: []
    };

    if (endIndex < await model.countDocuments().exec()) {
      result.next = {
        page: page + 1,
        limit: limit
      }
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      result.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = result
      next()
    } catch (e) {
      responseToClient(res, StatusCode.CODE_Exception,e.message)
    }
  }
}
