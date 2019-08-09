import { Router } from "express";
import userControllers from "./user.controllers";

const router = Router();

router
  .route("/")
  .get(userControllers.getUserProfile)
  .post(userControllers.createOne);

router.route("/register").post(userControllers.registerUser);

router.route("/:id").get(userControllers.getOne);

export default router;
