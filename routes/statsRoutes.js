const createError = require("http-errors");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const SessionStats = require("../models/SessionStats");

module.exports = (app) => {
  // @route GET /api/stats/sessions
  // @desc Return list of session stats for current user
  // @access Private
  app.get("/api/stats/sessions", requireLogin, async (req, res) => {
    const sessionStats = await SessionStats.find({ _user: req.decoded.id });
    res.status(200).send(sessionStats);
  });
  // @route POST /api/stats/sessions
  // @desc Add to and return list of session stats for current user
  // @access Private
  app.post("/api/stats/sessions", requireLogin, async (req, res) => {
    const new_sessionStats = new SessionStats({
      ...req.body,
      _user: req.decoded.id,
    });
    await new_sessionStats.save();
    const sessionStats = await SessionStats.find({ _user: req.decoded.id });
    res.status(200).send(sessionStats);
  });
  //
};
