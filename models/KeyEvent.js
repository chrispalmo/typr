const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//the ref: Comment below refers to the comment model
const KeyEventSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: "User" },
	timestamp: Number,
	event: {
		altKey: Boolean,
		charCode: Number,
		code: String,
		ctrlKey: Boolean,
		key: String,
		keyCode: Number,
		shiftKey: Boolean,
		which: Number
	},
	char: String,
	word: String,
	className: String,
	wpmCounter: Number
});

//If we weren't using Mocha for testing, below line registering the schema with mongoose would suffice:
//mongoose.model("dailyKeylog", DailyKeylogSchema);
const KeyEvent = mongoose.model("keyEvent", KeyEventSchema);

module.exports = KeyEvent;
