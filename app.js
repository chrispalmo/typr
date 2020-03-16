const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/User");

// const userRoutes = require("./routes/userRoutes");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//HTTP --> HTTPS redirect for Heroku
//thanks https://jaketrent.com/post/https-redirect-node-heroku/
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

// Passport middleware
app.use(passport.initialize());
// app.use(passport.session());

// Passport config
require("./services/passport")(passport);

// Routes
require("./routes/contentRoutes")(app);
require("./routes/keylogRoutes")(app);
require("./routes/userRoutes")(app);


if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    console.log("server: index.js: route not recognized");
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
