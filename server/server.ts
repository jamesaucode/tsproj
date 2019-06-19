import nextApp from './nextApp';
import * as routes from './routes/routes';
import * as express from 'express';
import * as passport from 'passport';
require('dotenv').config();
const cookieSession = require('cookie-session') ;
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();

app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000,
    keys: ["very secret"]
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes.api);
app.use('/', routes.app);

(async () => {
    try {
        await nextApp.prepare();
        app.listen(port, (err: any) => {
            if (err) throw err;
            console.log('> Running on localhost:3000');
        })
    }
    catch (err) {
        console.error(err.message);
    }
})();