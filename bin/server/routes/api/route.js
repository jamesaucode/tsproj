"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const getGroup_1 = require("./controllers/getGroup");
const postGroup_1 = require("./controllers/postGroup");
const getProfile_1 = require("./controllers/getProfile");
const getSession_1 = require("./controllers/getSession");
const getCards_1 = require("./controllers/getCards");
const getLogout_1 = require("./controllers/getLogout");
const getLogout_2 = require("./controllers/getLogout");
const saveCard_1 = require("./controllers/saveCard");
const deleteCard_1 = require("./controllers/deleteCard");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
};
router.get('/groups', getGroup_1.default);
router.post('/groups', postGroup_1.default);
router.get("/profile", getProfile_1.default);
router.get("/session", getSession_1.default);
router.get('/cards', getCards_1.default);
router.get("/logout", getLogout_1.default);
router.post("/register", getLogout_2.default);
router.post("/login", passport.authenticate('local'), isAuthenticated, (req, res) => {
    res.redirect(302, '/user/create');
});
router.post("/card", saveCard_1.default);
router.delete("/card", deleteCard_1.default);
exports.default = router;
//# sourceMappingURL=route.js.map