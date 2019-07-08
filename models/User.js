const mongoose = require("mongoose");
const { Schema } = mongoose;
const NewsDigestSchema = require("./NewsDigest");

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 },
	displayName: String,
	givenName: String,
	familyName: String,
	email: String,
	playlist: [NewsDigestSchema]
});

mongoose.model("users", userSchema);
