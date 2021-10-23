//require Twit instance
const T = require('./tweet')

//require log-timestamp
require('log-timestamp')(function() { return chalk.magenta("[" + new Date().toLocaleTimeString() + "]") });

//require chalk
const chalk = require('chalk');

//require config
const config = require('./config');

//get config variables
const userId = config.userId;

let url;

//create Twit stream that follows userId
let stream = T.stream('statuses/filter', { follow: userId });

//stream event that detects when a tweet is posted by userId, then checks if it contains a url
stream.on('tweet', (tweet) => {
    let urlObj = tweet.entities.urls[0].expanded_url;
    url = urlObj.toString();
    if (url !== null && url !== undefined) {
        //if url is found, log it to the console
        console.log(chalk.green("Found URL: ") + chalk.cyan(url));
    }
});