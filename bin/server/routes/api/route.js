"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
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
router.get('/profile', ProfileHandler);
router.get('/logout', LogoutHandler);
router.get('/session', SessionHandler);
exports.default = router;
//# sourceMappingURL=route.js.map