import * as express from 'express';
import { requestWithSession } from 'typings/express';

const router = express.Router();

const ProfileHandler = (req: requestWithSession | any, res: express.Response, next: express.NextFunction) => {
    if (req.user) {
        res.json(req.user);
    } else {
        next();
    }
}
const SessionHandler = (req : requestWithSession | any, res : express.Response, next: express.NextFunction) => {
    if (req.session.length !== 0) {
        res.json(req.session);
    } else {
        next();
    }
}
const LogoutHandler = (req: requestWithSession | any, res : express.Response, next: express.NextFunction) => {
    if (req.session) {
        req.session = null;
    } 
    next();
}

router.get('/profile', ProfileHandler);
router.get('/logout', LogoutHandler);
router.get('/session', SessionHandler);

export default router;