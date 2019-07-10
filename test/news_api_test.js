const assert = require("assert");
const User = require("../models/User");
const request = require("supertest");
const app = require("../app");

describe("NewsAPI tests", () => {
	//
	it("POST to /api/content/news returns an array of strings", done => {
		request(app)
			.post("/api/content/news")
			.send({
				sources: "hacker-news,national-geographic,time",
				pageSize: 30
			})
			.end((err, res) => {
				console.log(res.body);
				assert(res.body.length !== 0);
				done();
			});
	});
	//
});
