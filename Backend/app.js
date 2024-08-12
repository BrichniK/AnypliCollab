const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const createError = require('http-errors');
const http = require('http');
const authRouter = require('./routes/auth.route');
require('dotenv').config();
const app = express();


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
    name: "session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to AnypliCollab application." });
});

// Use the authRouter for authentication-related routes
app.use('/auth', authRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

const server = http.createServer(app);
server.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
