import * as express from "express";
import * as passport from 'passport';
import NextApp from '../../nextApp';
import { IRequest } from "interfaces/express";
import { NextFunction } from "connect";
import { IUser, UserModel } from "../../schemas/User";
import { ICards, CardsModel } from '../../schemas/Cards';
import { IncomingMessage } from "http";
import { GroupModel  } from "../../schemas/Group";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();

const ProfileHandler = (
  req: IRequest | any,
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
  req: IRequest | any,
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
  req: IRequest | any,
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
        UserModel.findOne({ $or: [ {email: req.body.email} ] }, (err : Error, found : boolean) => {
          if (found) {
            res.status(400).json({ message: "Cannot register this user. User already exist."});
          } else {
        UserInstance.save((err: Error) => {
          if (err) return res.status(400).json({ message: "Cannot register this user."});
          console.log("User saved");
          res.status(200).json({ message: "User registered!"})
        });
          }
        })
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
      (err: Error, cards: ICards) => {
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
const GetGroupHandler = (req: express.Request | any, res: express.Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    GroupModel.find({}, (err, groups) => {
      res.json(groups);
    })
  } else {
    res.status(400).json({'message': 'cannot find any groups'});
  }
}
const PostGroupHandler = (req: express.Request | any, res: express.Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    const GroupInstance = new GroupModel({ ...req.body });
    GroupInstance.save((err: Error) => {
      if (err) return res.send(err.message);
      console.log("Group Saved!");
    })
  } else {
    res.status(400).json({'message' : 'Cannot save this group'});
  }
}

router.get('/groups', GetGroupHandler);
router.post('/groups', PostGroupHandler);
router.get("/profile", ProfileHandler);
router.get("/session", SessionHandler);
router.get('/cards', getCardHandler);
router.get("/logout", LogoutHandler);
router.post("/register", RegisterHandler);
router.post("/login",
  passport.authenticate('local'),
  isAuthenticated,
  (req: IncomingMessage | any, res: express.Response) => {
    res.redirect(302, '/user/create')
  }
);
router.post("/card", SaveCardHandler);
router.delete("/card", deleteCardHandler);

export default router;
