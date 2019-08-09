import { Router } from "express";
import cardSetControllers from "./cardSet.controller";

const router = Router();

router
  .route("/")
  .get(cardSetControllers.getMany)
  .post(cardSetControllers.createOne);

router
  .route("/:id")
  .get(cardSetControllers.getOne)
  .post(cardSetControllers.insertOne)
  .delete(cardSetControllers.removeOne);

export default router;
