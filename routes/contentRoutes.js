const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/User");
const newsAPI = require("../services/NewsAPI");

module.exports = app => {
	app.post("/api/content/news", async (req, res) => {
		console.log("***req.user***");
		console.log(req.user);
		console.log("***/req.user***");

		newsAPI(req.body).then(apiRes => {
			const articles = [];
			apiRes.articles.map(article => {
				//console.log(article);
				articles.push(article.title + " (" + article.source.name + ")");
			});
			res.send(articles);
		});
		//res.send(NewsAPI(req.body));
		// res.send(req.body);

		// res.send(req.user);

		//expected client implementation:
		/*
			axios.post('/user', {
		    firstName: 'Fred',
		    lastName: 'Flintstone'
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

			THANKS:https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
		*/
	});
	//
};
