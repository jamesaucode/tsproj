"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const User_1 = require("../../schemas/User");
const Cards_1 = require("../../schemas/Cards");
const Group_1 = require("../../schemas/Group");
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
                User_1.UserModel.findOne({ $or: [{ email: req.body.email }] }, (err, found) => {
                    if (found) {
                        res.status(400).json({ message: "Cannot register this user. User already exist." });
                    }
                    else {
                        UserInstance.save((err) => {
                            if (err)
                                return res.status(400).json({ message: "Cannot register this user." });
                            console.log("User saved");
                            res.status(200).json({ message: "User registered!" });
                        });
                    }
                });
            });
        });
    }
};
const SaveCardHandler = (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        if (!req.body.question || !req.body.answer) {
            console.log('Empty question or answer, cannot be saved!');
            res.status(400).json({ message: "Cannot save this card", good: false });
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
const GetGroupHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
        Group_1.GroupModel.find({}, (err, groups) => {
            res.json(groups);
        });
    }
    else {
        res.status(400).json({ 'message': 'cannot find any groups' });
    }
};
const PostGroupHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
        const GroupInstance = new Group_1.GroupModel({ ...req.body });
        GroupInstance.save((err) => {
            if (err)
                return res.send(err.message);
            console.log("Group Saved!");
        });
    }
    else {
        res.status(400).json({ 'message': 'Cannot save this group' });
    }
};
router.get('/groups', GetGroupHandler);
router.post('/groups', PostGroupHandler);
router.get("/profile", ProfileHandler);
router.get("/session", SessionHandler);
router.get('/cards', getCardHandler);
router.get("/logout", LogoutHandler);
router.post("/register", RegisterHandler);
router.post("/login", passport.authenticate('local'), isAuthenticated, (req, res) => {
    res.redirect(302, '/user/create');
});
router.post("/card", SaveCardHandler);
router.delete("/card", deleteCardHandler);
exports.default = router;
//# sourceMappingURL=route.js.map