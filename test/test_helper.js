const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

before(done => {
	mongoose.connect("mongodb://localhost/users_test", { useNewUrlParser: true });
	mongoose.connection
		.once("open", () => done())
		.on("error", error => {
			console.warn("Warning, error");
		});
});

beforeEach(done => {
	//BE CAREFUL:
	//mongoose normalizes each collection name by lower-casing the entire collection name
	//ensure new models are
	const { users } = mongoose.connection.collections;
	users.drop(() => done());
});

//As additional models are added to the colleciton (and subsequently dropped before each test), use the below pattern:
//We can't avoid this "callback of doom" because mongo can only drop one database at a time

/*
	const { users, comments, blogposts } = mongoose.connection.collections;
	users.drop(() => {
		comments.drop(() => {
			blogposts.drop(() => {
				done();
			});
		});
	});
	*/
