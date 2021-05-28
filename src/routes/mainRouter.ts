import express from "express";
import siteRouter from "./stiteRouter";
import postRouter from "./postRouter";
function router(app: express.Application): void {
  app.use('/',siteRouter)
  app.use('/api/posts', postRouter)
}
export default router;
