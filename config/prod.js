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
	sendGridKey: process.env.SEND_GRID_KEY,
	redirectDomain: process.env.REDIRECT_DOMAIN
};

/*
	googleClientID: 			UPDATED - UNTESTED
	googleClientSecret: 	UPDATED - UNTESTED
	mongoURI:							NOT UPDATED - UNTESTED
	cookieKey: 						NOT UPDATED - UNTESTED
	stripePublishableKey: NOT UPDATED - UNTESTED
	stripeSecretKey: 			NOT UPDATED - UNTESTED
	sendGridKey: 					NOT UPDATED - UNTESTED
	redirectDomain: 			NOT UPDATED - UNTESTED
*/
