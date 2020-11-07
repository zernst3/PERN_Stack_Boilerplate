const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { db } = require("./db");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

app.use(express.static(path.join(__dirname, "./client/public/assets")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// <<<<<<<<<<<< Port Number >>>>>>>>>>>>
const PORT = process.env.PORT || 3000;

// <<<<<<<<<<<< Start Server >>>>>>>>>>>>
const serverStart = async () => {
  await db.sync();
  console.log("Connected to the database");
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

serverStart();

// <<<<<<<<<<<< Sequelize Session >>>>>>>>>>>>
// configure and create our database store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

// <<<<<<<<<<<< Session middleware >>>>>>>>>>>>
app.use(
  session({
    secret: process.env.SESSION_SECRET || "the default secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

// <<<<<<<<<<<< Passport >>>>>>>>>>>>
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  // __________
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // __________
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
  }
});

// <<<<<<<<<<<< Api Route >>>>>>>>>>>>
// Any routes or other various middlewares should go here!
app.use("/api", require("./api"));

// <<<<<<<<<<<< Serve HTML >>>>>>>>>>>>
app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)

// <<<<<<<<<<<< Error Handling >>>>>>>>>>>>
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
