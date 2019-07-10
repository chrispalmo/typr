const NewsAPI = require("newsapi");
const key = require("../config/keys").newsApiKey;
const newsApi = new NewsAPI(key);

//NOTE: You cannot mix the sources parameter with the country or category parameters.
module.exports = {
	// return newsApi.v2.topHeadlines(query);
	topHeadlines: newsApi.v2.topHeadlines,
	sources: newsApi.v2.sources
};

/*
EXAMPLE:

		sources: "bbc-news,the-verge",
		q: "bitcoin",
		category: "business",
		language: "en",
		country: "us"

		query =>
		newsApi.v2.topHeadlines(query).then(res => {
		console.log(res);
		res.articles.map(i => console.log(i.title));
		console.log("***");


*/
