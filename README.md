# ![typr-logo](https://raw.githubusercontent.com/chrispalmo/typr/master/client/public/favicon/favicon-32x32.png) typr

## About

Typr is a simple typing tutor that lets you practice typing using  material you actually want to read while providing instantaneous feedback and recording statistics. It is designed for people who already know the basics of touch typing but want to significantly increase their Words per Minute (WPM).

Few people use typing tutors (beyond the "which fingers do I use" stage) because:
1. the content is boring and irrelevant
2. exercises are too generic

Typr addresses the first point providing live-updated news headlines as typing material. The second point will be addressed in a future version.

## Tech stack

The backend runs on a `NodeJS/Express` server using `Mongoose` to connect to a `MongoDB` database. Authentication is handled by `PassportJS` using `JSON Web Tokens`. The frontend is built with `React` and `Redux`, with CSS styling borrowed from `Semantic UI`. Live news headlines are provided by [NewsAPI](https://newsapi.org/). 

## Demo [[Link](#)]

Try it out [here](#). 

*The demo is currently hosted on a Heroku free-tier server which treats itself to a nap when there is no traffic and can take up to 30 seconds to wake up, so please be patient!*

## Read more [[Link](#)]

View GIF screenshots demonstrating the user interface in action and read more about the motivation behind the project [here](#). 

# Features

### Public Release v1.0.0
- Practice touch typing with live-updated news headlines from 82 English-language news sources.
- Live-updating  Words-per-Minute (WPM) gauge and line graph to provide instant feedback and constant motivation. 
- Track progress with a full record of practice statistics (Date, Characters Typed, WPM, Accuracy and Total Time).

### Proposed Upcoming Features
- Detection and tracking of "needs improvement" key combinations and characters.
- Algorithmically-generated personalized exercises based on above statistics.
- Type long-form public domain from library with bookmarking of current position.

# Development Server Setup

1. `npm install`
2. Create `./config/dev.js` to store dev credentials:
```
module.exports = {
	mongoURI:
		"YOUR_DATABASE_CONNECTION_URI",
	secretOrKey: "AN_ARBITRARY_STRING_USED_TO_ENCODE_JSON_WEB_TOKENS",
	newsApiKey: "YOUR_NEWSAPI_KEY",
};

```
3. `npm run start`

