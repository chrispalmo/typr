const assert = require("assert");
const User = require("../models/User");
const KeyEvent = require("../models/KeyEvent");
const testKeyEvents = require("./testKeyEvents");

describe("KeyEvent insert tests", () => {
	//
	beforeEach((done) => {
		const testUser0 = new User({
			googleId: "test_google_id_0",
		});
		testUser0.save().then((res) => {
			assert(!testUser0.isNew);
			done();
		});
	});
	//
	beforeEach((done) => {
		//simulation of req.body:
		const reqBody = testKeyEvents.test1;
		const first_new_key_event_ts = reqBody[0].timestamp;
		//simulation of req.user:
		User.findOne({ googleId: "test_google_id_0" }).then((user) => {
			//$gte === greater than or equal to
			query = {
				_user: user._id,
				timestamp: { $gte: first_new_key_event_ts },
			};
			KeyEvent.find(query).then((keyEvents) => {
				last_recorded_key_ts = !keyEvents[0]
					? 0
					: keyEvents[0].timestamp;
				//only add new keyEvents that have not been saved yet
				new_keyEvents_to_add = reqBody.filter(
					(keyEvent) => keyEvent.timestamp > last_recorded_key_ts
				);
				//associate each keyEvent with the current user
				new_keyEvents_to_add.forEach(
					(keyEvent) => (keyEvent._user = user._id)
				);
				//save new keyEvents
				KeyEvent.insertMany(new_keyEvents_to_add).then((keyEvents) => {
					assert(keyEvents.length === 2);
					done();
				});
			});
		});
	});
	//
	it("Can create new KeyEvents without duplication --- using promises", (done) => {
		//simulation of req.body:
		const reqBody = testKeyEvents.test2;
		const first_new_key_event_ts = reqBody[0].timestamp;
		//simulation of req.user:
		User.findOne({ googleId: "test_google_id_0" }).then((user) => {
			//find all keyEvents associated with the current with a timestamp range overlapping that of the uploaded keyEvents
			//$gte === greater than or equal to
			query = {
				_user: user._id,
				timestamp: { $gte: first_new_key_event_ts },
			};
			KeyEvent.find(query).then((keyEvents) => {
				last_recorded_key_ts = !keyEvents[0]
					? 0
					: keyEvents[0].timestamp;
				//only add new keyEvents that have not been saved yet
				new_keyEvents_to_add = reqBody.filter(
					(keyEvent) => keyEvent.timestamp > last_recorded_key_ts
				);
				//associate each keyEvent with the current user
				new_keyEvents_to_add.forEach(
					(keyEvent) => (keyEvent._user = user._id)
				);
				//save new keyEvents
				KeyEvent.insertMany(new_keyEvents_to_add).then((keyEvents) => {
					KeyEvent.find().then((allKeyEvents) => {
						assert(allKeyEvents.length === 3);
						done();
					});
				});
			});
		});
	});
	//
	it("Can create new KeyEvents without duplication --- using async/await", async () => {
		//NOTICE NO "done" ARGUMENT PASSED, BECAUSE ASYNC/AWAIT USED
		//simulation of req.body:
		const reqBody = testKeyEvents.test2;
		const first_new_key_event_ts = reqBody[0].timestamp;
		//simulation of req.user:
		const user = await User.findOne({ googleId: "test_google_id_0" });
		//find all keyEvents associated with the current with a timestamp range overlapping that of the uploaded keyEvents
		//$gte === greater than or equal to
		query = {
			_user: user._id,
			timestamp: { $gte: first_new_key_event_ts },
		};
		const keyEvents = await KeyEvent.find(query);
		last_recorded_key_ts = !keyEvents[0] ? 0 : keyEvents[0].timestamp;
		//only add new keyEvents that have not been saved yet
		new_keyEvents_to_add = reqBody.filter(
			(keyEvent) => keyEvent.timestamp > last_recorded_key_ts
		);
		//associate each keyEvent with the current user
		new_keyEvents_to_add.forEach((keyEvent) => (keyEvent._user = user._id));
		//save new keyEvents
		await KeyEvent.insertMany(new_keyEvents_to_add);
		KeyEvent.find().then((allKeyEvents) => {
			assert(allKeyEvents.length === 3);
		});
	});

	//
});
