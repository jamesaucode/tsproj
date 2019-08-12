"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const googleOAuth = require("passport-google-oauth20");
const passport = require("passport");
const url_1 = require("url");
const nextApp_1 = require("../../nextApp");
const user_model_1 = require("../../../resources/user/user.model");
const group_model_1 = require("../../../resources/group/group.model");
const cardSet_model_1 = require("../../../resources/cardSet/cardSet.model");
const console = require("console");
require("dotenv").config();
console.log("RUNNING");
const bcrypt = require("bcrypt");
// Own passport strategy , using bcrypt to compare the password hash
const LocalStrategy = require("passport-local").Strategy;
const LocalAuthentication = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: true,
}, async (email, password, done) => {
    try {
        const user = await user_model_1.UserModel.findOne({ email })
            .lean()
            .exec();
        if (!user) {
            return done(null, false, { message: "Failed" });
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (passwordMatched) {
            console.log("Correct credentials! Logging in ...");
            done(null, user);
        }
        else {
            done(null, false, { message: "Wrong login credentials" });
        }
    }
    catch (error) {
        console.error(error);
        done(null, false, { message: "Error" });
    }
});
passport.use(LocalAuthentication);
const router = express.Router();
const handler = nextApp_1.default.getRequestHandler();
const googleLogin = {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "/auth/redirect",
};
const gotProfile = (accessToken, refreshToken, profile, done) => {
    user_model_1.UserModel.findOne({ email: profile.emails[0].value }, (err, user) => {
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
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
}));
router.get("/auth/redirect", (req, res, next) => {
    console.log("At redirect");
    next();
}, passport.authenticate("google"), (req, res) => {
    console.log("Logged in");
    if (req.isAuthenticated()) {
        if (process.env.NODE_ENV === "production") {
            return res.redirect(`https://${req.headers.host}/user/cards`);
        }
        return res.redirect("/user/cards");
    }
    else {
        return res.redirect("/");
    }
});
router.get("/user/cards", (req, res) => {
    if (req.isAuthenticated()) {
        const cardSet = req.user.cardSet;
        console.log("Render cards");
        nextApp_1.default.render(req, res, "/user/cards", { cardSet });
    }
    else {
        return res.redirect("/");
    }
});
router.get("/user/groups", (req, res) => {
    if (req.isAuthenticated()) {
        group_model_1.GroupModel.find({}, (err, groups) => {
            nextApp_1.default.render(req, res, "/user/groups", { groups });
        });
    }
    else {
        return res.redirect("/");
    }
});
router.get("/user/profile", (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        nextApp_1.default.render(req, res, "/user/profile", { user });
    }
    else {
        return res.redirect("/");
    }
});
router.get("/user/logout", (req, res) => {
    if (req.isAuthenticated()) {
        req.session = null;
        return res.redirect("/");
    }
    else {
        return res.redirect("back");
    }
});
router.get("/user/*", (req, res) => {
    if (req.isAuthenticated()) {
        console.log("You are already logged in");
        handler(req, res, url_1.parse(req.url, true));
    }
    else {
        return res.redirect("/");
    }
});
router.get("/home", (req, res) => {
    const user = req.user;
    nextApp_1.default.render(req, res, "/home", { user });
});
router.get("*", (req, res) => {
    const { pathname, query } = url_1.parse(req.url, true);
    handler(req, res, url_1.parse(req.url, true));
});
passport.serializeUser((user, done) => {
    console.log("Serializing");
    console.log(user);
    user_model_1.UserModel.findById(user._id, async (err, userFound) => {
        if (err) {
            console.error(err);
        }
        if (userFound) {
            console.log("User already exist");
            done(null, user);
        }
        else {
            try {
                const UserInstance = await user_model_1.UserModel.create({
                    firstName: user.name.givenName,
                    lastName: user.name.familyName,
                    displayName: user.displayName,
                    email: user.emails ? user.emails[0].value : "",
                    googleId: user.id,
                });
                console.log(UserInstance);
            }
            catch (e) {
                console.error(e);
                done(null, user);
            }
        }
    });
});
passport.deserializeUser(async (user, done) => {
    try {
        const cardSet = await cardSet_model_1.CardSetModel.find({ creator: user._id })
            .lean()
            .exec();
        Object.assign(user, { cardSet });
        done(null, user);
    }
    catch (e) {
        console.error(e);
    }
});
exports.default = router;
//# sourceMappingURL=route.js.map