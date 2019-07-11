const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	displayName: String,
	givenName: String,
	familyName: String,
	email: String,
	newsDigest: {
		query: {
			sources: String,
			pageSize: Number
		}
	}
});

//If we weren't using Mocha for testing, below line registering the schema with mongoose would suffice:
// mongoose.model("users", userSchema);
const User = mongoose.model("users", userSchema);
module.exports = User;
