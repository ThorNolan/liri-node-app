require("dotenv").config();

// How to access keys: var spotify = new Spotify(keys.spotify);

// variables to keep track of required NPM packages
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');


// Store user inputs in variables, argv[2] for choosing which action and argv[3] for user's search query
var actionChoice = process.argv[2];
var searchQuery = process.argv[3];


// Possible commands:
// node liri.js concert-this <artist/band name here>
// node liri.js spotify-this-song '<song name here>'
// node liri.js movie-this '<movie name here>'
// node liri.js do-what-it-says












