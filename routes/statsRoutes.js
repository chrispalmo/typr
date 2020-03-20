const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const SessionStats = require("../models/SessionStats");

module.exports = app => {
  app.get("/api/stats/sessions", requireLogin, async (req, res) => {
    const sessionStats = await SessionStats.find({ _user: req.decoded.id });
    res.send(sessionStats);
  });
  //
  app.post("/api/stats/sessions", requireLogin, async (req, res) => {
    const new_sessionStats = new SessionStats({...req.body, _user: req.decoded.id})
    await new_sessionStats.save()
    const sessionStats = await SessionStats.find({ _user: req.decoded.id });
    res.send(sessionStats);
  });
  //
};
