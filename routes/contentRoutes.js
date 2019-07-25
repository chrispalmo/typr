const mongoose = require("mongoose");
const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/User");
const newsApi = require("../services/NewsApi");

//TODO -- IMPLETEMENT ERROR HANDLING MIDDLEWARE

module.exports = app => {
	//TODO -- ADD requireLogin MIDDLEWARE !!! !!! !!!
	app.get("/api/content/news", async (req, res) => {
		console.log("contentRoutes: incoming request to /api/content/news/sources");
		//console.log(req.body);
		// console.log(req.user.id);
		const user = await User.findOne({ googleId: req.user.googleId });
		const news = await newsApi.topHeadlines({
			sources: user.newsDigest.selectedSources,
			pageSize: user.newsDigest.numberOfArticles
		});
		const headlines = _.toPairs(news)[2][1].map(article => {
			return { source: article.source.name, title: article.title };
		});

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
