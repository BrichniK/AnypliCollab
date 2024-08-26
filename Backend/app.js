const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const createError = require('http-errors');
const http = require('http');

require('dotenv').config();
const cors = require('cors');


// Routers
const authRouter = require('./routes/auth.route');
const taskRouter = require('./routes/task.route');
const activityRouter = require('./routes/activity.route');
const boardRouter = require('./routes/board.route');
const userRouter = require('./routes/user.router');
const reclamationRouter = require('./routes/reclamation.route');
const app = express();

console.log("JWT Secret:", process.env.JWT_Secret);
// CORS setup

app.use(cors({
  origin: 'http://localhost:4200',
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Cookie session setup
app.use(cookieSession({
  name: "session",
  secret: "COOKIE_SECRET",
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', 
}));


// Routes
app.use('/auth', authRouter);
app.use('/task', taskRouter);
app.use('/activity', activityRouter);
app.use('/board', boardRouter);
app.use('/user', userRouter);
app.use('/reclamation', reclamationRouter);

app.get("/welcome", (req, res) => {
  res.json({ message: "Welcome to AnypliCollab application." });
});

// Error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Server setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
