"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
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
                const UserInstance = new User_1.UserModel({ ...req.body, password: hash });
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
        User_1.UserModel.findOne({ email: req.body.email }, (err, user) => {
            bcrypt.compare(req.body.password, user.password, (err, bRes) => {
                if (err)
                    res.json({ message: "Login failed" });
                if (bRes) {
                    res.json({ message: "Login success!!" });
                }
                else {
                    res.json({ message: "Incorrect password" });
                }
            });
        });
    }
};
const SaveCardHandler = (req, res, next) => {
    if (req.body) {
        console.log(req.body);
        const CardInstance = new Cards_1.CardsModel(req.body);
        CardInstance.save((err) => {
            if (err)
                return console.error(err);
            console.log('Card saved');
        });
    }
};
router.get("/profile", ProfileHandler);
router.get("/logout", LogoutHandler);
router.get("/session", SessionHandler);
router.post("/register", RegisterHandler);
router.post("/login", LoginHandler);
router.post("/card", SaveCardHandler);
exports.default = router;
//# sourceMappingURL=route.js.map