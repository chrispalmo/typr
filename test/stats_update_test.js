const assert = require("assert");
const User = require("../models/User");
const KeyEvent = require("../models/KeyEvent");
const testKeyEvents = require("./testKeyEvents");
const statistics = require("../helpers/statistics.js");

describe("Statistics tests", () => {
	//
	beforeEach(done => {
		//create and save a test user
		this.testUser0 = new User({
			googleId: "test_google_id_0"
		});
		this.testUser0.save().then(res => {
			assert(!this.testUser0.isNew);
			done();
		});
	});
	//
	beforeEach(done => {
		const new_keyEvents_to_add = testKeyEvents.test4;
		new_keyEvents_to_add.forEach(
			keyEvent => (keyEvent._user = this.testUser0._id)
		);
		//save new keyEvents
		KeyEvent.insertMany(new_keyEvents_to_add).then(keyEvents => {
			assert(keyEvents.length === 2313);
			done();
		});
	});
	//
	it("produces typing statistics based on keyEvent user's keyPress data", async () => {
		const keyEvents = await KeyEvent.find({ _user: this.testUser0._id }).sort({
			timestamp: 1
		});

		const stats = statistics.analyze(keyEvents, 1000);

		assert(stats.wordsTyped === 137);
		assert(stats.charsTyped === 2172);
		assert(stats.totalTime === 135412);
	});
	//
});
