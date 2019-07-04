import * as express from "express";
import * as googleOAuth from "passport-google-oauth20";
import * as passport from "passport";
import { parse } from "url";
import nextApp from "../../nextApp";
import { CardsModel, ICard } from "../../schemas/Card";
import { UserModel, IUser } from "../../schemas/User";
import { GroupModel, IGroup, IGroupModel } from "../../schemas/Group";
import { IRequest } from "../../../interfaces/express";

require("dotenv").config();
console.log("RUNNING");

const bcrypt = require("bcrypt");
const path = require("path");
// Own passport strategy , using bcrypt to compare the password hash
const LocalStrategy = require("passport-local").Strategy;
const LocalAuthentication = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: true
  },
  function(email: string, password: string, done: any) {
    UserModel.findOne({ email }, (err: Error, user: IUser) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Failed" });
      }
      bcrypt.compare(
        password,
        user.password,
        (err: Error, isCorrect: boolean) => {
          if (err) {
            return done(err);
          }
          if (isCorrect) {
            console.log("Correct credentials, logging you in");
            done(null, user);
          } else {
            console.log("Incorrect Credentials");
            done(null, false, { message: "Failed" });
          }
        }
      );
    });
  }
);
passport.use(LocalAuthentication);

const router = express.Router();
const handler = nextApp.getRequestHandler();
const googleLogin: googleOAuth.StrategyOptions = {
  clientID: <string>process.env.GOOGLE_CLIENTID,
  clientSecret: <string>process.env.GOOGLE_SECRET,
  callbackURL: "/auth/redirect"
};
const gotProfile = (
  accessToken: string,
  refreshToken: string,
  profile: googleOAuth.Profile | any,
  done: any
) => {
  UserModel.findOne({ email : profile.emails[0].value }, (err: Error, user: IUser) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, profile);
    }
    return done(null, user);
  });
};

const googleAuthentication = new googleOAuth.Strategy(googleLogin, gotProfile);

passport.use(googleAuthentication);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

router.get(
  "/auth/redirect",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("At redirect");
    next();
  },
  passport.authenticate("google"),
  (req: express.Request, res: express.Response) => {
    console.log("Logged in");
    if (req.isAuthenticated()) {
      if (process.env.NODE_ENV === "production") {
        return res.redirect(`https://${req.headers.host}/user/cards`);
      }
      return res.redirect("/user/cards");
    } else {
      return res.redirect("/");
    }
  }
);
router.get("/user/cards", (req, res) => {
  if (req.isAuthenticated()) {
    const cards = req.user.cards;
    console.log("Render cards");
    return nextApp.render(req, res, "/user/cards", { cards });
  } else {
    return res.redirect("/");
  }
});
router.get("/user/group", (req, res) => {
  if (req.isAuthenticated()) {
    const name = req.query.name;
    if (!name) {
      res.redirect("/user/groups");
    }
    GroupModel.findOne({ name }, (err: Error, group: any) => {
      if (group) {
        return nextApp.render(req, res, "/user/group", {
          group,
          queryParams: { ...req.query }
        });
      } else {
        res.redirect("/user/groups");
      }
    });
  } else {
    res.redirect("/");
  }
});
router.get("/user/groups", (req, res) => {
  if (req.isAuthenticated()) {
    GroupModel.find({}, (err: Error, groups: any) => {
      return nextApp.render(req, res, "/user/groups", { groups });
    });
  } else {
    return res.redirect("/");
  }
});
router.get("/user/profile", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("I am logged in lmao");
    const user = req.user;
    return nextApp.render(req, res, "/user/profile", { user });
  } else {
    return res.redirect("/");
  }
});
router.get("/user/logout", (req: any, res) => {
  if (req.isAuthenticated()) {
    req.session = null;
    return res.redirect("/");
  } else {
    return res.redirect("back");
  }
});

router.get("/user/*", (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("You are already logged in");
    handler(req, res, parse(req.url, true));
  } else {
    return res.redirect("/");
  }
});

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    next();
  }
});

router.get("/home", (req, res) => {
  const user = req.user;
  return nextApp.render(req, res, "/home", { user });
});
router.get("*", (req, res) => {
  const { pathname, query } = parse(req.url, true);
  handler(req, res, parse(req.url, true));
});
passport.serializeUser<googleOAuth.Profile | any, any>((user, done) => {
  console.log("Serializing");
  console.log(user);
  UserModel.findById(user._id, (err: Error, userFound: googleOAuth.Profile) => {
    if (err) {
      console.error(err);
    }
    if (userFound) {
      console.log("User already exist");
      done(null, user);
    } else {
      const UserInstance = new UserModel({
        firstName: user.name.givenName,
        lastName: user.name.familyName,
        displayName: user.displayName,
        email: user.emails ? user.emails[0].value : "",
        id: user.id,
        group: []
      });
      UserInstance.save((err: Error) => {
        if (err) console.error(err);
        console.log("User saved");
        done(null, user);
      });
    }
  });
});
passport.deserializeUser<googleOAuth.Profile, any>((user, done) => {
  // console.log('Deserializing');
  CardsModel.find({ creator: user._id }, (err: Error, cards: ICard) => {
    if (err) console.error(err.message);
    user.cards = cards;
    done(null, user);
  });
});

export default router;
