const mongoose = require("mongoose");
const { Schema } = mongoose;

const NewsDigestSchema = new Schema({
	sources: { type: [String], default: [] },
	lastUpdated: Number,
	content: [String]
});

//instead of registering the schema with mongoose, we export it so we can use it as a subdocument
module.exports = NewsDigestSchema;
