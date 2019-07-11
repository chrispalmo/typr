const assert = require("assert");
const User = require("../models/User");
const request = require("supertest");
const app = require("../app");

describe("NewsApi tests", () => {
	//
	xit("GET to /api/content/news returns an array of strings", done => {
		request(app)
			.get("/api/content/news")
			.send({
				sources: "hacker-news,national-geographic,time",
				pageSize: 30
			})
			.end(async (err, res) => {
				// res.body.articles.map(i => console.log(i));
				console.log(res.body.articles.length + " articles returned.");
				assert(res.body.articles.length !== 0);
				done();
			});
	});
	//
	it("GET to /api/content/news/sources returns an object containing all english news sources", done => {
		request(app)
			.get("/api/content/news/sources")
			.send({ language: "en" })
			.end((err, res) => {
				// console.log(res.body.sources);
				console.log(res.body.sources.length + " sources available.");
				// assert(res.body.length !== 0);
				done();
			});
	});
	//
});
