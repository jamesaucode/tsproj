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
  .delete(cardSetControllers.removeOne);

router.route("/:name").post(cardSetControllers.insertOne);

export default router;
