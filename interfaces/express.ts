import * as express from 'express';
import googleOAuth from 'passport-google-oauth20';
import { IUser } from '../server/schemas/User';

export interface IRequest extends express.Request {
    session?: {
        passport: {
            user?: googleOAuth.Profile
        }
    },
    sessionCookies : express.CookieOptions 
}

export interface ISession {
    session : {
        passport : {
            user : IUser | googleOAuth.Profile
        }
    }
}