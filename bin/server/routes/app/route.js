"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const googleOAuth = require("passport-google-oauth20");
const url_1 = require("url");
const nextApp_1 = require("../../nextApp");
require('dotenv').config();
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
const isAuthenicated = (req, res, next) => {
    if (req.session) {
        next();
    }
    else {
        res.redirect('/');
    }
};
const googleAuthentication = new googleOAuth.Strategy(googleLogin, gotProfile);
passport.use(googleAuthentication);
router.get('/auth/google', passport.authenticate("google", { scope: ["profile", "email"] }));
router.get('/auth/redirect', (req, res, next) => {
    console.log('At redirect');
    next();
}, passport.authenticate("google"), (req, res) => {
    console.log("Logged in");
    res.redirect('/main');
});
router.get('/main', isAuthenicated);
router.get('/*', (req, res) => {
    const { pathname, query } = url_1.parse(req.url, true);
    handler(req, res, url_1.parse(req.url, true));
});
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = router;
//# sourceMappingURL=route.js.map