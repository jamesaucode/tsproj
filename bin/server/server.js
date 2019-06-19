"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nextApp_1 = require("./nextApp");
const routes = require("./routes/routes");
const express = require("express");
const passport = require("passport");
require('dotenv').config();
const cookieSession = require('cookie-session');
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000,
    keys: ["very secret"]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes.api);
app.use('/', routes.app);
(async () => {
    try {
        await nextApp_1.default.prepare();
        app.listen(port, (err) => {
            if (err)
                throw err;
            console.log('> Running on localhost:3000');
        });
    }
    catch (err) {
        console.error(err.message);
    }
})();
//# sourceMappingURL=server.js.map