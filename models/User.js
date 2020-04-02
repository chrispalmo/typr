const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		default: Date.now,
	},
	newsDigest: {
		selectedSources: { type: [String], default: [] },
		numberOfArticles: { type: Number, default: 20 },
		currentPosition: { type: Number, default: 0 },
	},
});

//If we weren't using Mocha for testing, below line registering the schema with mongoose would suffice:
// mongoose.model("users", userSchema);
module.exports = User = mongoose.model("users", userSchema);
