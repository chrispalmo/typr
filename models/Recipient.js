const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

//instead of registering the schema with mongoose, we export it so we can use it as a subdocument
module.exports = recipientSchema;
