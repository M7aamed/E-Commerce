const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
<<<<<<< HEAD
const flash = require("connect-flash");
require('dotenv').config();
const errorController = require("./controllers/error");
const User = require("./models/user");

const DATABASE_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;;
const DATABASE_PORT = process.env.DATABASE_PORT || 3000;
const MONGODB_URI = DATABASE_CONNECTION_STRING;
=======
const flash = require('connect-flash');

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "process.env.MONGO_DB_URI";
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session?.isLoggedIn || false;
  next();
});

app.set("view engine", "ejs");
app.set("views", "views");

const csrfProtection = csrf();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});
// local for All Program **important**
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("CONNECTED");
<<<<<<< HEAD
    app.listen(DATABASE_PORT);
=======
    app.listen(3000);
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
  })
  .catch((err) => {
    console.log(err);
  });
