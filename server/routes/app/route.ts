import * as express from 'express';
import * as googleOAuth from 'passport-google-oauth20';
import * as passport from 'passport';
import { parse } from 'url';
import nextApp from '../../nextApp';
import { CardsModel, CardsScehmaTypes } from '../../schemas/Cards';
import { UserModel, UserSchemaTypes } from '../../schemas/User';
import { app } from '../routes';

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
},
    function (email: string, password: string, done: any) {
        UserModel.findOne({ email }, (err: Error, user: UserSchemaTypes) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: "Failed" }) };
            bcrypt.compare(password, user.password, (err: Error, isCorrect: boolean) => {
                if (err) { return done(err) }
                if (isCorrect) {
                    console.log('Correct credentials, logging you in');
                    done(null, user);
                } else {
                    console.log('Incorrect Credentials');
                    done(null, false, { message: "Failed" });
                }
            })
        })
    }
)
passport.use(LocalAuthentication);

const router = express.Router();
const handler = nextApp.getRequestHandler();
const googleLogin: googleOAuth.StrategyOptions = {
    clientID: <string>process.env.GOOGLE_CLIENTID,
    clientSecret: <string>process.env.GOOGLE_SECRET,
    callbackURL: "/auth/redirect"
}
const gotProfile = (accessToken: string, refreshToken: string, profile: googleOAuth.Profile, done: any) => {
    done(null, profile);
}

const googleAuthentication = new googleOAuth.Strategy(googleLogin, gotProfile);

passport.use(googleAuthentication);

router.get('/auth/google',
    passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

router.get('/auth/redirect',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('At redirect');
        next();
    },
    passport.authenticate("google"),
    (req: express.Request, res: express.Response) => {
        console.log("Logged in");
        if (req.user) {
            nextApp.render(req, res, '/user/create');
        }
        // res.redirect('/user/create');
    })
router.get('/user/cards', (req, res) => {
    const cards = req.user.cards;
    console.log('Render cards')
    return nextApp.render(req, res, '/user/cards', { cards })
})
router.get('*', (req, res) => {
    const { pathname, query } = parse(req.url, true);
    // console.log(`pathname : ${pathname}`);
    // console.log(`query : ${query}`);
    handler(req, res, parse(req.url, true));
})
passport.serializeUser<googleOAuth.Profile | any, any>((user, done) => {
    console.log('Serializing');
    console.log(user);
    UserModel.findOne({ id: user.id }, (err: Error, userFound: googleOAuth.Profile) => {
        if (userFound) {
            console.log("User already exist");
            done(null, user);
        } else {
            const UserInstance = new UserModel({
                firstName: user.name.givenName,
                lastName: user.name.familyName,
                displayName: user.displayName,
                email: user.emails ? user.emails[0].value : '',
                id: user.id,
                group: []
            });
            UserInstance.save((err: Error) => {
                if (err) console.error(err);
                console.log('User saved');
                done(null, user);
            })
        }
    })
})
passport.deserializeUser<googleOAuth.Profile, any>((user, done) => {
    console.log('Deserializing');
    CardsModel.find({ id : user.id }, (err: Error, cards: CardsScehmaTypes) => {
        user.cards = cards;
        done(null, user)
    })
})

export default router;