//require Twit instance
const T = require('./tweet')

//require signale logging
const signale = require('signale');

//require config
const config = require('./config');

//get config variables
const userId = config.userId;

let url;

//create Twit stream that follows userId
let stream = T.stream('statuses/filter', { follow: userId });

//stream event that detects when a tweet is posted by userId, then checks if it contains a url
stream.on('tweet', (tweet) => {
    url = tweet.text.match(/\bhttps?:\/\/\S+/gi);
    if (url !== null) {
        //if url is found, log it to the console
        signale.success("Found URL: " + url[0]);
    }
});