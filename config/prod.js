/*
TO SET PRODUCTION KEYS:
			>> git remote add heroku https:it.heroku.com/xxxxx.git
SET Config Vars:
			>> heroku config:set SOME_API_CREDENTIAL=somevalue
REMOVE a config var
			>> heroku config:unset SOME_API_CREDENTIAL
VIEW config vars:
			>> heroku config
*/

module.exports = {
	mongoURI: process.env.MONGO_URI,
	secretOrKey: process.env.JWT_SECRET,
	newsApiKey: process.env.NEWS_API_KEY,
	redirectDomain: process.env.REDIRECT_DOMAIN,
};
