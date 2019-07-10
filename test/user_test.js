const assert = require("assert");
const User = require("../models/User");

describe("User tests", () => {
	//
	beforeEach(done => {
		const timeFetched = Date.now();
		const testUser0 = new User({
			googleId: "test_google_id_0",
			displayName: "Joe Smith 0",
			givenName: "Joseph 0",
			familyName: "Smith 0",
			email: "joe.smith@gmail.com"
		});
		testUser0.save().then(res => {
			assert(!testUser0.isNew);
			done();
		});
	});
	//
	it("saves a user", done => {
		const timeFetched = Date.now();
		const testUser1 = new User({
			googleId: "test_google_id_1",
			displayName: "Joe Smith 1",
			givenName: "Joseph 1",
			familyName: "Smith 1",
			email: "joe.smith@gmail.com"
		});
		testUser1.save().then(res => {
			assert(!testUser1.isNew);
			done();
		});
	});
	//
	it("finds and deletes a user", done => {
		User.findOneAndRemove({ googleId: "test_google_id_0" })
			.then(() => User.findOne({ displayName: "Joe Smith 0" }))
			.then(user => {
				assert(user === null);
				done();
			});
	});
	//
});
