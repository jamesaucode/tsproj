import * as express from "express";
import * as passport from "passport";
import { NextFunction } from "express";

const router = express.Router();

const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
): void => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(400).json({ message: "Incorrect credentials" });
  }
};

router.post(
  "/login",
  passport.authenticate("local"),
  isAuthenticated,
  (req: express.Request, res: express.Response): void => {
    res.redirect(302, "/user/create");
  },
);

export default router;
