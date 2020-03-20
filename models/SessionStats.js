const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionStatsSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: "User" },
	timestamp: {
		type: String,
		default: Date.now
	},
	wordsTyped: {
		type: Number,
		required: true
	},
	charsTyped: {
		type: Number,
		required: true
	},
	accuracy: {
		type: Number,
		required: true
	},	
	wpm: {
		type: Number,
		required: true
	},
	totalTime: {
		type: Number,
		required: true
	}
});

//If we weren't using Mocha for testing, below line registering the schema with mongoose would suffice:
//mongoose.model("dailyKeylog", DailyKeylogSchema);
const SessionStats = mongoose.model("sessionStats", SessionStatsSchema);

module.exports = SessionStats;
