require("dotenv").config();

// =============================== VARIABLES =================================

// variables to keep track of required NPM packages
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
// local variable to store my spotify keys exported from keys.js
var spotify = new Spotify(keys.spotify);

// default search values for omdb and spotify if user fails to input or input is undefined
var defaultMovie = "Mr. Nobody";
var defaultSong = "The Sign"


// Store user inputs in variables, argv[2] for choosing which action and argv[3] for user's search query terms
var actionChoice = process.argv[2];
var searchQuery = process.argv[3];

// Possible commands:
// node liri.js concert-this <artist/band name here>
// node liri.js spotify-this-song '<song name here>'
// node liri.js movie-this '<movie name here>'
// node liri.js do-what-it-says

// ================================ FUNCTIONS =================================

//This function takes in both user inputs as arguments and determines which action to take
function checkInputs(actionChoice, searchQuery){

    // switch case checks for which action the user has input and calls its corresponding function
	switch(actionChoice){

	case 'spotify-this-song':
		// command will search using the default song if user input is undefined
		if(searchQuery === undefined){
			searchQuery = defaultSong;
		}     
        spotifyThis(searchQuery); 
        break;

    case 'movie-this':
    	// command will search using the default movie if user input is undefined
		if(searchQuery === undefined){
			searchQuery = defaultMovie;
		}    
        movieThis(searchQuery); 
        break;

	case 'do-what-it-says':
        doWhatItSays(); 
        break;

    // default to deal with case of invalid user inputs    
	default: 
		console.log("Not a valid command! Please try a little harder.");
    }
}   

// ============================= CALL FUNCTIONS ============================

// Call my checkInputs function to initiate and wait for user inputs 
checkInputs(actionChoice, searchQuery);











