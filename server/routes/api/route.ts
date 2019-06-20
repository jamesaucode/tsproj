import * as express from "express";
import { requestWithSession } from "typings/express";
import { NextFunction } from "connect";
import { UserSchemaTypes, UserModel } from "../../schemas/User";

const router = express.Router();

const ProfileHandler = (
  req: requestWithSession | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user) {
    res.json(req.user);
  } else {
    next();
  }
};
const SessionHandler = (
  req: requestWithSession | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session.length !== 0) {
    res.json(req.session);
  } else {
    next();
  }
};
const LogoutHandler = (
  req: requestWithSession | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session) {
    req.session = null;
  }
  next();
};
const RegisterHandler = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  console.log(req.body);
  if (req.body) {
    const UserInstance = new UserModel(req.body);
    UserInstance.save((err: Error) => {
      if (err) return console.error(err);
      console.log("User saved");
    });
  }
};

router.get("/profile", ProfileHandler);
router.get("/logout", LogoutHandler);
router.get("/session", SessionHandler);
router.post("/register", RegisterHandler);

export default router;
