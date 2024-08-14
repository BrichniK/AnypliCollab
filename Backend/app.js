const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const createError = require('http-errors');
const http = require('http');
const authRouter = require('./routes/auth.route');
const taskRouter = require('./routes/task.route')
const activityRouter = require('./routes/activity.route');
const boardRouter = require('./routes/board.route')
const userRouter = require('./routes/user.router')
require('dotenv').config();
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: [
        "http://localhost:4200",
        "http://127.0.0.1:4200",
        "http://192.168.1.157:4200",
        "http://192.168.1.157:4200",
        "*"]
};
app.use(cors(corsOptions));


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.use(cookieSession({
    name: "session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
}));




app.get("/", (req, res) => {
    res.json({ message: "Welcome to AnypliCollab application." });
});

const db = require('@prisma/client');


// Use the authRouter for authentication-related routes
app.use('/auth', authRouter);
app.use('/task', taskRouter);
app.use('/activity', activityRouter);
app.use('/board', boardRouter);
app.use('/user', userRouter);

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


module.exports = app;
