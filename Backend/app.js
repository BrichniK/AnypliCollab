const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const mongo = require('mongoose');
const createError = require('http-errors');
const Server = require('http');
const mongoconnect = require('./config/dbconnection.json');


const indexRouter = require('./routes/index');
const tasksRouter = require('./routes/task.route');
const projectsRouter = require('./routes/project.route');
const teamsRouter = require('./routes/team.route');
const authRoutes = require('./routes/auth.route');

const app = express();


// Connect to MongoDB
mongo.connect(mongoconnect.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json()); // Ensure this is only included once
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Cookie session setup
app.use(cookieSession({
  name: "session",
  secret: "COOKIE_SECRET",
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
}));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to AnypliCollab application." });
});

require("./routes/auth.route")(app);
require("./routes/user.route")(app)

// Route setup
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/projects', projectsRouter);
app.use('/teams', teamsRouter);
app.use('/', authRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Initialize roles if not present
// const Role = require("./models/role.model");
// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({ name: "user" }).save(err => {
//         if (err) console.log("error", err);
//         console.log("added 'user' to roles collection");
//       });

//       new Role({ name: "manager" }).save(err => {
//         if (err) console.log("error", err);
//         console.log("added 'manager' to roles collection");
//       });

//       new Role({ name: "admin" }).save(err => {
//         if (err) console.log("error", err);
//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }

// Call the initial function to setup roles


// Start server
const server = Server.createServer(app);
server.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
