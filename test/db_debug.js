const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User");
require("./models/SessionStats");

// const userRoutes = require("./routes/userRoutes");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const SessionStats = require("./models/SessionStats");

SessionStats.find().then(res => {
	console.log(res)
})

