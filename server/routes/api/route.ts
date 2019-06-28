import * as express from "express";
import * as passport from 'passport';
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
        const displayName = [req.body.firstName, req.body.lastName].join(' ');
        console.log(displayName);
        const UserInstance = new UserModel({ ...req.body, password: hash, displayName });
        UserInstance.save((err: Error) => {
          if (err) return console.error(err);
          console.log("User saved");
        });
      });
    });
  }
};

const SaveCardHandler = (
  req: Request | any,
  res: express.Response,
  next: NextFunction
) => {
  if (req.body) {
    console.log(req.body);
    if (!req.body.question || !req.body.answer) {
      console.log('Empty question or answer, cannot be saved!');
      res.status(400).json({ message: "Cannot save this card", good: false });
      return;
    }
    const CardInstance = new CardsModel(req.body);
    CardInstance.save((err: Error) => {
      if (err) return res.json({ message:err.message, good: false});
      console.log('Card saved');
      res.json({ message: 'Card saved!', good: true });
      return ;
    })
  }
};

const getCardHandler = (
  req: Request | any,
  res: express.Response,
  next: NextFunction
) => {
  if (req.user) {
    console.log(req.user.id);
    CardsModel.find(
      { id: req.user.id },
      (err: Error, cards: CardsScehmaTypes) => {
        if (err) throw err;
        console.log(cards);
        res.json(cards);
      }
    );
  } else {
    res.sendStatus(400);
    next();
  }
}
const deleteCardHandler = (req: express.Request | any, res: express.Response, next: NextFunction) => {
  if (req.user && req.body) {
    CardsModel.deleteOne({ _id: req.body.id }, (err: Error) => {
      if (err) console.error(err.message);
      console.log(`Card ${req.body.id} deleted`);
      res.sendStatus(200);
    })
  }
}
const isAuthenticated = (req: express.Request | any, res: express.Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }
}

router.get("/profile", ProfileHandler);
router.get("/logout", LogoutHandler);
router.get("/session", SessionHandler);
router.get('/cards', getCardHandler);
router.post("/register", RegisterHandler);
router.post("/login",
  passport.authenticate('local'),
  isAuthenticated,
  (req: express.Request, res: express.Response) => {
    res.redirect(302, '/user/create');
  }
);
router.post("/card", SaveCardHandler);
router.delete("/card", deleteCardHandler);

export default router;
