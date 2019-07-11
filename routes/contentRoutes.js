const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/User");
const newsApi = require("../services/NewsApi");

//TODO -- IMPLETEMENT ERROR HANDLING MIDDLEWARE

module.exports = app => {
	//TODO -- ADD requireLogin MIDDLEWARE !!! !!! !!!
	app.get("/api/content/news", async (req, res) => {
		const headlines = await newsApi.topHeadlines(req.body);
		res.send(headlines);

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
	app.get("/api/content/news/sources", async (req, res) => {
		const sources = await newsApi.sources(req.body);
		res.send(sources);
	});
	//
};
