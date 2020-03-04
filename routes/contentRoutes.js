const mongoose = require("mongoose");
const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/User");

const NewsAPI = require("newsapi");
const key = require("../config/keys").newsApiKey;
const newsApi = new NewsAPI(key).v2;

module.exports = app => {
	app.get("/api/content/news", requireLogin, async (req, res) => {
		const user = await User.findOne({ _id: req.decoded.id });
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
	app.post("/api/content/news/sources", requireLogin, async (req, res) => {
		const sources = await newsApi.sources(req.body);
		res.send(sources);
	});
	//
};
