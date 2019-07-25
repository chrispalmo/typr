const mongoose = require("mongoose");
const { Schema } = mongoose;

//TODO: make a unique Id separate from googleId
//TODO: update of contentRoutes.js will need to follow
const userSchema = new Schema({
	googleId: String,
	displayName: String,
	givenName: String,
	familyName: String,
	email: String,
	newsDigest: {
		selectedSources: { type: [String], default: [] },
		numberOfArticles: { type: Number, default: 20 },
		currentPosition: { type: Number, default: 0 }
	}
});

//If we weren't using Mocha for testing, below line registering the schema with mongoose would suffice:
// mongoose.model("users", userSchema);
const User = mongoose.model("users", userSchema);
module.exports = User;
