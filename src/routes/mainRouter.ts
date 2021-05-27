import express from "express";
import siteRouter from "./stiteRouter";
function router(app: express.Application): void {
  app.use('/',siteRouter)
}

export default router;
