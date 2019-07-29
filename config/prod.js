// PRODUCTION KEYS
// 			>> git remote add heroku https://git.heroku.com/xxxxx.git
// SET Config Vars:
// 			>> heroku config:set SOME_API_CREDENTIAL=somevalue
// REMOVE a config var
// 			>> heroku config:unset SOME_API_CREDENTIAL
// VIEW config vars:
// 			>> heroku config

module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,
	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	newsApiKey: process.env.NEWS_API_KEY,
	redirectDomain: process.env.REDIRECT_DOMAIN
};

/*
	googleClientID: 			UPDATED - TESTED
	googleClientSecret: 	UPDATED - TESTED
	mongoURI:							EMAILY DEV CREDS - TESTED
	cookieKey: 						EMAILY DEV CREDS - TESTED
	stripePublishableKey: EMAILY DEV CREDS - TESTED
	stripeSecretKey: 			EMAILY DEV CREDS - TESTED
	sendGridKey: 					EMAILY DEV CREDS - UNTESTED
	newsApiKey:  					TYPR DEV CREDS - UNTESTED
	redirectDomain: 			UPDATED - UNTESTED
*/
