const passport = require("passport");
const User = require("../models/User");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  //TODO: Require login
  app.post("/api/current_user", (req, res) => {
    console.log("***post to /api/current_user***");
    console.log(req.user);
    console.log(req.body);
    const filter = { googleId: req.user.googleId };
    const update = req.body;
    //You should set the new option to true to return the document after update was applied.
    const returnDocAfterUpdate = { new: true };
    User.findOneAndUpdate(filter, update, returnDocAfterUpdate).then(
      updatedUser => res.send(updatedUser)
    );
  });
};
