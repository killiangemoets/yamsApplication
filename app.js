var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");

// ** MIDDLEWARE ** //
// const whitelist = [
//   "http://localhost:3000",
//   "http://localhost:8080",
//   "https://shrouded-journey-38552.heroku...",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin);
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable");
//       callback(null, true);
//     } else {
//       console.log("Origin rejected");
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));

require("./models/connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "reactapp/build")));

// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "reactapp/build")));
//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "reactapp/build", "index.html"));
//   });
// }

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
