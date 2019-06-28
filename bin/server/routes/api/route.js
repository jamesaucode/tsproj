"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const User_1 = require("../../schemas/User");
const Cards_1 = require("../../schemas/Cards");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();
const ProfileHandler = (req, res, next) => {
    if (req.user) {
        res.json(req.user);
    }
    else {
        next();
    }
};
const SessionHandler = (req, res, next) => {
    if (req.session.length !== 0) {
        res.json(req.session);
    }
    else {
        next();
    }
};
const LogoutHandler = (req, res, next) => {
    if (req.session) {
        req.session = null;
    }
    next();
};
const RegisterHandler = (req, res, next) => {
    if (req.body) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                const displayName = [req.body.firstName, req.body.lastName].join(' ');
                console.log(displayName);
                const UserInstance = new User_1.UserModel({ ...req.body, password: hash, displayName });
                UserInstance.save((err) => {
                    if (err)
                        return console.error(err);
                    console.log("User saved");
                });
            });
        });
    }
};
const LoginHandler = (req, res, next) => {
    if (req.body) {
        if (!req.body.email || !req.body.password) {
            res.sendStatus(400);
            return;
        }
    }
};
const SaveCardHandler = (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        if (!req.body.question || !req.body.answer) {
            console.log('Empty question or answer, cannot be saved!');
            // res.sendStatus(400);
            res.json({ message: "Cannot save this card", good: false });
            return;
        }
        const CardInstance = new Cards_1.CardsModel(req.body);
        CardInstance.save((err) => {
            if (err)
                return res.json({ message: err.message, good: false });
            console.log('Card saved');
            res.json({ message: 'Card saved!', good: true });
            return;
        });
    }
};
const getCardHandler = (req, res, next) => {
    if (req.user) {
        console.log(req.user.id);
        Cards_1.CardsModel.find({ id: req.user.id }, (err, cards) => {
            if (err)
                throw err;
            console.log(cards);
            res.json(cards);
        });
    }
    else {
        res.sendStatus(400);
        next();
    }
};
const deleteCardHandler = (req, res, next) => {
    if (req.user && req.body) {
        Cards_1.CardsModel.deleteOne({ _id: req.body.id }, (err) => {
            if (err)
                console.error(err.message);
            console.log(`Card ${req.body.id} deleted`);
            res.sendStatus(200);
        });
    }
};
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
};
router.get("/profile", ProfileHandler);
router.get("/logout", LogoutHandler);
router.get("/session", SessionHandler);
router.get('/cards', getCardHandler);
router.post("/register", RegisterHandler);
router.post("/login", passport.authenticate('local'), isAuthenticated, (req, res) => {
    res.redirect(302, '/user/create');
});
router.post("/card", SaveCardHandler);
router.delete("/card", deleteCardHandler);
exports.default = router;
//# sourceMappingURL=route.js.map