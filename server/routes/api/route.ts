import * as express from "express";
import { requestWithSession } from "typings/express";
import { NextFunction } from "connect";
import { UserSchemaTypes, UserModel } from "../../schemas/User";
import { CardsScehmaTypes, CardsModel } from '../../schemas/Cards';

const bcrypt = require("bcrypt");

const saltRounds = 10;
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
  if (req.body) {
    bcrypt.genSalt(saltRounds, (err: Error, salt: string) => {
      bcrypt.hash(req.body.password, salt, (err: Error, hash: string) => {
        const UserInstance = new UserModel({ ...req.body, password: hash });
        UserInstance.save((err: Error) => {
          if (err) return console.error(err);
          console.log("User saved");
        });
      });
    });
  }
};

const LoginHandler = (
  req: Request | any,
  res: express.Response,
  next: NextFunction
) => {
  if (req.body) {
    UserModel.findOne(
      { email: req.body.email },
      (err: Error, user: UserSchemaTypes) => {
        bcrypt.compare(
          req.body.password,
          user.password,
          (err: Error, bRes: express.Response) => {
            if (err) res.json({ message: "Login failed" });
            if (bRes) {
              res.json({ message: "Login success!!" });
            } else {
              res.json({ message: "Incorrect password" });
            }
          }
        );
      }
    );
  }
};
const SaveCardHandler = (
  req: Request | any,
  res: express.Response,
  next: NextFunction
) => {
  if (req.body) {
    console.log(req.body);
    const CardInstance = new CardsModel(req.body);
    CardInstance.save((err : Error) => {
      if (err) return console.error(err);
      console.log('Card saved');
    })
  }
};

router.get("/profile", ProfileHandler);
router.get("/logout", LogoutHandler);
router.get("/session", SessionHandler);
router.post("/register", RegisterHandler);
router.post("/login", LoginHandler);
router.post("/card", SaveCardHandler);

export default router;
