const assert = require("assert");
const User = require("../models/User");

describe("User tests", () => {
	//
	beforeEach((done) => {
		const timeFetched = Date.now();
		const testUser0 = new User({
			googleId: "test_google_id_0",
			displayName: "Joe Smith 0",
			givenName: "Joseph 0",
			familyName: "Smith 0",
			email: "joe.smith@gmail.com",
			newsDigest: {
				selectedSources: ["abc-news", "abc-news-au"],
			},
		});
		testUser0.save().then((res) => {
			assert(!testUser0.isNew);
			done();
		});
	});
	//
	it("saves a user", (done) => {
		const timeFetched = Date.now();
		const testUser1 = new User({
			googleId: "test_google_id_1",
			displayName: "Joe Smith 1",
			givenName: "Joseph 1",
			familyName: "Smith 1",
			email: "joe.smith@gmail.com",
		});
		testUser1.save().then((res) => {
			assert(!testUser1.isNew);
			done();
		});
	});
	//
	it("finds and deletes a user", (done) => {
		User.findOneAndRemove({ googleId: "test_google_id_0" })
			.then(() => User.findOne({ displayName: "Joe Smith 0" }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});
	//
	it("finds and updates a user", (done) => {
		//ref: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
		const filter = { googleId: "test_google_id_0" };
		const update = { email: "updated_email@gmail.com" };
		//You should set the new option to true to return the document after update was applied.
		const returnDocAfterUpdate = { new: true };
		User.findOneAndUpdate(filter, update, returnDocAfterUpdate).then(
			(res) => {
				assert(res.email === "updated_email@gmail.com");
				done();
			}
		);

		// Alternative test
		// .then(() => User.findOne({ displayName: "Joe Smith 0" }))
		// .then(user => {
		// 	assert(user.email === "updated_email@gmail.com");
		// 	done();
		// });
	});
	//
});
