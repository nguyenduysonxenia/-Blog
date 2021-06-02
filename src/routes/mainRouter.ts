import express from "express";
import siteRouter from "./stiteRouter";
import postRouter from "./postRouter";
import commentRouter from "./commentRouter";

function router(app: express.Application): void {
  app.use("/api/users", siteRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/comments", commentRouter);
}
export default router;
