"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const googleOAuth = require("passport-google-oauth20");
const passport = require("passport");
const url_1 = require("url");
const nextApp_1 = require("../../nextApp");
const Cards_1 = require("../../schemas/Cards");
const User_1 = require("../../schemas/User");
require('dotenv').config();
console.log("RUNNING");
const bcrypt = require("bcrypt");
const path = require('path');
// Own passport strategy , using bcrypt to compare the password hash
const LocalStrategy = require('passport-local').Strategy;
const LocalAuthentication = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
}, function (email, password, done) {
    User_1.UserModel.findOne({ email }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Failed" });
        }
        ;
        bcrypt.compare(password, user.password, (err, isCorrect) => {
            if (err) {
                return done(err);
            }
            if (isCorrect) {
                console.log('Correct credentials, logging you in');
                done(null, user);
            }
            else {
                console.log('Incorrect Credentials');
                done(null, false, { message: "Failed" });
            }
        });
    });
});
passport.use(LocalAuthentication);
const router = express.Router();
const handler = nextApp_1.default.getRequestHandler();
const googleLogin = {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "/auth/redirect"
};
const gotProfile = (accessToken, refreshToken, profile, done) => {
    done(null, profile);
};
const googleAuthentication = new googleOAuth.Strategy(googleLogin, gotProfile);
passport.use(googleAuthentication);
router.get('/auth/google', passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" }));
router.get('/auth/redirect', (req, res, next) => {
    console.log('At redirect');
    next();
}, passport.authenticate("google"), (req, res) => {
    console.log("Logged in");
    if (req.user) {
        nextApp_1.default.render(req, res, '/user/create');
    }
    // res.redirect('/user/create');
});
router.get('/user/cards', (req, res) => {
    const cards = req.user.cards;
    console.log('Render cards');
    return nextApp_1.default.render(req, res, '/user/cards', { cards });
});
router.get('/', (req, res) => {
    const user = req.user;
    return nextApp_1.default.render(req, res, '/', { user });
});
router.get('*', (req, res) => {
    const { pathname, query } = url_1.parse(req.url, true);
    // console.log(`pathname : ${pathname}`);
    // console.log(`query : ${query}`);
    handler(req, res, url_1.parse(req.url, true));
});
passport.serializeUser((user, done) => {
    console.log('Serializing');
    console.log(user);
    User_1.UserModel.findOne({ id: user.id }, (err, userFound) => {
        if (userFound) {
            console.log("User already exist");
            done(null, user);
        }
        else {
            const UserInstance = new User_1.UserModel({
                firstName: user.name.givenName,
                lastName: user.name.familyName,
                displayName: user.displayName,
                email: user.emails ? user.emails[0].value : '',
                id: user.id,
                group: []
            });
            UserInstance.save((err) => {
                if (err)
                    console.error(err);
                console.log('User saved');
                done(null, user);
            });
        }
    });
});
passport.deserializeUser((user, done) => {
    console.log('Deserializing');
    Cards_1.CardsModel.find({ id: user.id }, (err, cards) => {
        user.cards = cards;
        done(null, user);
    });
});
exports.default = router;
//# sourceMappingURL=route.js.map