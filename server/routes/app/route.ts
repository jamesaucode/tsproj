import * as express from "express";
import * as googleOAuth from "passport-google-oauth20";
import * as passport from "passport";
import { parse } from "url";
import nextApp from "../../nextApp";
import { UserModel, UserTypes } from "../../../resources/user/user.model";
import { GroupModel } from "../../../resources/group/group.model";
import { CardSetModel } from "../../../resources/cardSet/cardSet.model";
import console = require("console");

require("dotenv").config();
console.log("RUNNING");

const bcrypt = require("bcrypt");
// Own passport strategy , using bcrypt to compare the password hash
const LocalStrategy = require("passport-local").Strategy;
const LocalAuthentication = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: true,
  },
  async (email: string, password: string, done: any): Promise<void> => {
    try {
      const user = await UserModel.findOne({ email })
        .lean()
        .exec();

      if (!user) {
        return done(null, false, { message: "Failed" });
      }
      const passwordMatched = await bcrypt.compare(password, user.password);

      if (passwordMatched) {
        console.log("Correct credentials! Logging in ...");
        done(null, user);
      } else {
        done(null, false, { message: "Wrong login credentials" });
      }
    } catch (error) {
      console.error(error);
      done(null, false, { message: "Error" });
    }
  },
);
passport.use(LocalAuthentication);

const router = express.Router();
const handler = nextApp.getRequestHandler();
const googleLogin: googleOAuth.StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENTID as string,
  clientSecret: process.env.GOOGLE_SECRET as string,
  callbackURL: "/auth/redirect",
};
const gotProfile = (
  accessToken: string,
  refreshToken: string,
  profile: googleOAuth.Profile | any,
  done: any,
): void => {
  UserModel.findOne(
    { email: profile.emails[0].value },
    (err: Error, user: UserTypes): void => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, profile);
      }
      return done(null, user);
    },
  );
};

const googleAuthentication = new googleOAuth.Strategy(googleLogin, gotProfile);

passport.use(googleAuthentication);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

router.get(
  "/auth/redirect",
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    console.log("At redirect");
    next();
  },
  passport.authenticate("google"),
  (req: express.Request, res: express.Response): void => {
    console.log("Logged in");
    if (req.isAuthenticated()) {
      if (process.env.NODE_ENV === "production") {
        return res.redirect(`https://${req.headers.host}/user/cards`);
      }
      return res.redirect("/user/cards");
    } else {
      return res.redirect("/");
    }
  },
);
router.get("/user/cards", (req, res): void => {
  if (req.isAuthenticated()) {
    const cardSet = req.user.cardSet;
    console.log("Render cards");
    nextApp.render(req, res, "/user/cards", { cardSet });
  } else {
    return res.redirect("/");
  }
});
router.get("/user/groups", (req, res): void => {
  if (req.isAuthenticated()) {
    GroupModel.find({}, (err: Error, groups: any): void => {
      nextApp.render(req, res, "/user/groups", { groups });
    });
  } else {
    return res.redirect("/");
  }
});
router.get("/user/profile", (req, res): void => {
  if (req.isAuthenticated()) {
    const user = req.user;
    nextApp.render(req, res, "/user/profile", { user });
  } else {
    return res.redirect("/");
  }
});
router.get("/user/logout", (req: any, res): void => {
  if (req.isAuthenticated()) {
    req.session = null;
    return res.redirect("/");
  } else {
    return res.redirect("back");
  }
});

router.get("/user/*", (req, res): void => {
  if (req.isAuthenticated()) {
    console.log("You are already logged in");
    handler(req, res, parse(req.url, true));
  } else {
    return res.redirect("/");
  }
});

router.get("/home", (req, res): void => {
  const user = req.user;
  nextApp.render(req, res, "/home", { user });
});

router.get("*", (req, res): void => {
  const { pathname, query } = parse(req.url, true);
  handler(req, res, parse(req.url, true));
});
passport.serializeUser<googleOAuth.Profile | any, any>((user, done): void => {
  console.log("Serializing");
  console.log(user);
  UserModel.findById(
    user._id,
    async (err: Error, userFound: googleOAuth.Profile): Promise<void> => {
      if (err) {
        console.error(err);
      }
      if (userFound) {
        console.log("User already exist");
        done(null, user);
      } else {
        try {
          const UserInstance = await UserModel.create({
            firstName: user.name.givenName,
            lastName: user.name.familyName,
            displayName: user.displayName,
            email: user.emails ? user.emails[0].value : "",
            googleId: user.id,
          });
          console.log(UserInstance);
        } catch (e) {
          console.error(e);
          done(null, user);
        }
      }
    },
  );
});
passport.deserializeUser<googleOAuth.Profile, any>(
  async (user, done): Promise<void> => {
    try {
      const cardSet = await CardSetModel.find({ creator: user._id })
        .lean()
        .exec();
      Object.assign(user, { cardSet });
      done(null, user);
    } catch (e) {
      console.error(e);
    }
  },
);

export default router;
