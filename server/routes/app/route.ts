import * as express from 'express';
import * as passport from 'passport';
import * as googleOAuth from 'passport-google-oauth20';
import { parse } from 'url';
import nextApp from '../../nextApp';
import { requestWithSession } from '../../../typings/express';
import { CardsModel, CardsScehmaTypes } from '../../schemas/Cards';

const path = require('path');
require('dotenv').config();
console.log("RUNNING");
console.log(process.env.GOOGLE_CLIENTID);

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
const isAuthenicated = (req: requestWithSession, res: express.Response, next: express.NextFunction) => {
    // If session exist, that means the user is authenticated
    if (req.session) {
        next();
    } else {
        res.redirect('/');
    }
}

const googleAuthentication = new googleOAuth.Strategy(googleLogin, gotProfile);

passport.use(googleAuthentication);

router.get('/auth/google',
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get('/auth/redirect',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('At redirect');
        next();
    },
    passport.authenticate("google"),
    (req: express.Request, res: express.Response) => {
        console.log("Logged in");
        res.redirect('/user/main');
    })

router.get('/*', (req, res) => {
    const { pathname, query } = parse(req.url, true);
    handler(req, res, parse(req.url, true));
})
passport.serializeUser<googleOAuth.Profile, any>((user, done) => {
    console.log('Serializing');
    done(null, user);
})
passport.deserializeUser<googleOAuth.Profile, any>((user, done) => {
    // console.log('Deserializing');
    // console.log(user);
    CardsModel.find({id : user.id}, (err : Error,cards : CardsScehmaTypes) => {
        user.cards = cards;
        done(null, user)
    })
})

export default router;