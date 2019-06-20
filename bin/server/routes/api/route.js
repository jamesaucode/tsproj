"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const User_1 = require("../../schemas/User");
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
    console.log(req.body);
    if (req.body) {
        const UserInstance = new User_1.UserModel(req.body);
        UserInstance.save((err) => {
            if (err)
                return console.error(err);
            console.log("User saved");
        });
    }
};
router.get("/profile", ProfileHandler);
router.get("/logout", LogoutHandler);
router.get("/session", SessionHandler);
router.post("/register", RegisterHandler);
exports.default = router;
//# sourceMappingURL=route.js.map