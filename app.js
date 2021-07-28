// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
const session = require("express-session");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
const userModel = require('./models/User.model')

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
)

app.use((req, res, next) => {
    if (req.session.currentUser) {
        userModel.findById(req.session.currentUser._id)
            .then((userFromDb) => {
                res.locals.currentUser = userFromDb;
                res.locals.isLoggedIn = true;
                next();
            })
            .catch((error) => {
                next(error)
            })
    }else{
        res.locals.currentUser = undefined;
        res.locals.isLoggedIn = false;
        next();
    }
})



// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);
const signUp = require('./routes/signup');
app.use('/signup', signUp);
const signIn = require('./routes/signin');
app.use('/signin', signIn);
const profile = require('./routes/profile');
app.use('/profile', profile);
const protectedRoutes = require('./routes/protectedRoutes');
app.use(protectedRoutes);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

