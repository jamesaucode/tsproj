import * as express from "express";
import * as passport from 'passport';
import { IncomingMessage } from "http";
import getGroup from '../controllers/getGroup';
import postGroup from '../controllers/postGroup';
import getProfile from '../controllers/getProfile';
import getSession from '../controllers/getSession';
import getCards from '../controllers/getCards';
import getLogout from '../controllers/getLogout';
import postRegister from '../controllers/getLogout'; 
import saveCard from '../controllers/saveCard';
import deleteCard from '../controllers/deleteCard';
import postJoinGroup from '../controllers/postJoinGroup';
import { NextFunction } from "express";

const router = express.Router();

const isAuthenticated = (req: express.Request | any, res: express.Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
}

router.get('/groups', getGroup);
router.post('/groups', postGroup);
router.get("/profile", getProfile);
router.get("/session", getSession);
router.get('/cards', getCards);
router.get("/logout", getLogout);
router.post('/joingroup/:name', postJoinGroup);
router.post("/register", postRegister);
router.post(
  "/login",
  passport.authenticate("local"),
  isAuthenticated,
  (req: IncomingMessage, res: express.Response) => {
    res.redirect(302, "/user/create");
  }
);
router.post("/card/:cardSetName", saveCard);
router.delete("/card", deleteCard);

export default router;