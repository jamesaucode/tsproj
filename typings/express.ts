import * as express from 'express';
import googleOAuth from 'passport-google-oauth20';
import { IncomingMessage } from 'http';

export interface requestWithSession extends express.Request {
    session?: {
        passport: {
            user?: googleOAuth.Profile
        }
    },
    sessionCookies : express.CookieOptions 
}

export interface SessionProps {
    session : {
        passport : {
            user : googleOAuth.Profile
        }
    }
}