const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/User");
const KeyEvent = require("../models/KeyEvent");
const statistics = require("../helpers/statistics.js");

module.exports = app => {
	app.post("/api/keylog", async (req, res) => {
		const first_new_key_event_ts = req.body[0].timestamp;
		const user = await User.findOne({ _id: req.user._id });
		//find all keyEvents associated with the current user with a timestamp range overlapping that of the uploaded keyEvents
		//$gte === greater than or equal to
		query = {
			_user: user._id,
			timestamp: { $gte: first_new_key_event_ts }
		};
		const keyEvents = await KeyEvent.find(query);
		last_recorded_key_ts = !keyEvents[0] ? 0 : keyEvents[0].timestamp;
		//only add new keyEvents that have not been saved yet
		new_keyEvents_to_add = req.body.filter(
			keyEvent => keyEvent.timestamp > last_recorded_key_ts
		);
		//associate each keyEvent with the current user
		new_keyEvents_to_add.forEach(keyEvent => (keyEvent._user = user._id));
		//save new keyEvents
		await KeyEvent.insertMany(new_keyEvents_to_add);
		KeyEvent.find().then(allKeyEvents => {
			res.send(allKeyEvents);
		});
	});
	//
	app.get("/api/keylog/stats/alltime", async (req, res) => {
		const keyEvents = await KeyEvent.find({ _user: req.user._id }).sort({
			timestamp: 1
		});
		const stats = statistics.analyze(keyEvents, statistics.auto_pause_delay);
		res.send(stats);
	});
};
