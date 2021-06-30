const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const mongoose = require("mongoose");

const indexRouter = require("./routes/index-router");
const authRouter = require("./routes/auth-router");
const siteRouter = require ("./routes/site-router");

const app = express();

// require database configuration
require('./configs/db.config');

const session = require("express-session");
const MongoStore = require("connect-mongo");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// SESSION MIDDLEWARE
// Checks incoming request: if there is a cookie, and if cookie has valid session id
app.use(
  session({
    secret: 'PizzaBytes',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/auth-demo'
    })
  })
);

// ROUTES
app.use('/site', siteRouter)
app.use("/auth", authRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
