const assert = require("assert");
const User = require("../models/User");

describe("User tests", () => {
	//
	it("saves a user", done => {
		const timeFetched = Date.now();
		const testUser = new User({
			googleId: "test_google_id",
			displayName: "Joe Smith",
			givenName: "Joseph",
			familyName: "Smith",
			email: "joe.smith@gmail.com",
			newsDigest: {
				sources: ["news-source-A", "news-source-B"],
				lastFetched: timeFetched,
				content: ["Headline1", "Headline2", "Headline3"]
			}
		});
		testUser.save().then(res => {
			console.log(res);
			assert(!testUser.isNew);
			done();
		});
	});
	//
});
