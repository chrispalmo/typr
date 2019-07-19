const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/User");
const newsApi = require("../services/NewsApi");

//TODO -- IMPLETEMENT ERROR HANDLING MIDDLEWARE

module.exports = app => {
	//TODO -- ADD requireLogin MIDDLEWARE !!! !!! !!!
	app.post("/api/content/news", async (req, res) => {
		// console.log("contentRoutes: incoming request to /api/content/news/sources");
		// console.log(req.body);
		const headlines = await newsApi.topHeadlines(req.body);
		res.send(headlines);
	});
	//
	app.post("/api/content/news/sources", async (req, res) => {
		// console.log("contentRoutes: incoming request to /api/content/news/sources");
		// console.log(req.body);
		const sources = await newsApi.sources(req.body);
		res.send(sources);
	});
	//
};
