import nextApp from './nextApp';
import * as routes from './routes/routes';
import * as express from 'express';
import * as passport from 'passport';
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session') ;
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost:27017/myDB', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind('console', 'connection error!'))
db.once('open', () => {
    console.log('Connected to mongoDB!');
})

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
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