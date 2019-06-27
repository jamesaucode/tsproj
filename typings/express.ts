import * as express from 'express';
import googleOAuth from 'passport-google-oauth20';
import { UserSchemaTypes } from '../server/schemas/User';

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
            user : UserSchemaTypes | googleOAuth.Profile
        }
    }
}