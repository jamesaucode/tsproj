import { Router } from "express";
import groupControllers from "./group.controllers";

const router = Router();

router
  .route("/")
  .get(groupControllers.getAllGroups)
  .post(groupControllers.createOne);

router
  .route("/:id")
  .get(groupControllers.removeOne)
  .get(groupControllers.getMany);

router.route("/join/:id").post(groupControllers.joinGroupAsMember);

router.route("/leave/:id").post(groupControllers.leaveGroup);

export default router;
