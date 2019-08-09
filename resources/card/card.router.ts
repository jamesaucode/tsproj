import { Router } from "express";
import cardControllers from "./card.controllers";

const router = Router();

router.route("/").get(cardControllers.getMany);

router
  .route("/:id")
  .get(cardControllers.getOne)
  .post(cardControllers.createOne);

export default router;
