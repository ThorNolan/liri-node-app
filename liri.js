require("dotenv").config();

// =============================== VARIABLES =================================

// variables to keep track of required NPM packages
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");

// local variable to store my spotify key exported from keys.js
var spotify = new Spotify(keys.spotify);


// default search values for omdb and spotify if user fails to input or input is undefined
var defaultMovie = "Mr. Nobody";
var defaultSong = "The Sign";


// Store user inputs in variables, argv[2] for choosing which action and argv[3] for user's search query term/s
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

    case "concert-this":
        concertSearch(artistName);
        break;    

	case "spotify-this-song":
		// command will search using the default song if user input is undefined
		if(searchQuery === undefined){
			searchQuery = defaultSong;
		}     
        spotifySearch(searchQuery); 
        break;

    case "movie-this":
    	// command will search using the default movie if user input is undefined
		if(searchQuery === undefined){
			searchQuery = defaultMovie;
		}    
        movieSearch(searchQuery); 
        break;

	case "do-what-it-says":
        doWhatItSays(); 
        break;

    // default to deal with case of invalid user inputs    
	default: 
		console.log("Not a valid command! Please try a little harder.");
    }
}   

// function to make a call to the Bands In Town API and display upcoming concert info
function concertSearch(artistName) {
   // https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp
}

// function to make a call to the Spotify API using the axios package and display song data
function spotifySearch(songName) {

    spotify.search({ type: "track", query: songName}, function(err, data) {
        if (err) {
            console.log("Uh oh! An error occurred: " + err);
            return;
        }

        // store song data in a local variable
        var song = data.tracks.items[0];

        // console.log out the data from the API call about the searched song
        console.log("------Artists-----");
        for(i = 0; i < song.artists.length; i++){
            console.log(song.artists[i].name);
        }

        console.log("------Song Name-----");
        console.log(song.name);

        console.log("-------Preview Link-----");
        if (song.preview_url !== null) {
            console.log(song.preview_url);
        } else if (song.preview_url === null){
            console.log("Sorry, no preview link available for this song :(")
        }

        console.log("-------Album-----");
        console.log(song.album.name);

    });

}

// function to make a call to the OMDB API using the axios package and display movie data
function movieSearch(movieName) {
    
	    // Store movie ID in a local variable
	    var movie =  JSON.parse(body).results[0].id;
	    //console.log(movie);

        // Create new request to the OMDB API using the movie name entered by the user
        var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

	    request(queryURL, function(error, response, movieObj) {

        // Check for errors and only proceed on successful response (status code 200)
  	    if (!error && response.statusCode === 200) {

            // Parse the movie JSON object
	    	var movieObj = JSON.parse(movieObj);

            // Console.log out the movie data to the user in their console
	    	console.log("--------Title-----------");
            console.log(movieObj.Title);
            
	    	console.log("--------Year Released-----------");
	    	console.log(movieObj.Year);

	   		console.log("--------IMDB Rating-----------");
	   		console.log(movieObj.imdbRating);
            
	   		console.log("--------Rotten Tomatoes Rating-----------");
            console.log(movieObj.Ratings[2].Value);
                  
	   		console.log("--------Country Produced-----------");
	   		console.log(movieObj.Country);
	   		
	   		console.log("--------Languages-----------");
	   		console.log(movieObj.Language);
	   		
	   		console.log("--------Plot----------------");
	   		console.log(movieObj.Plot);

	   		console.log("--------Actors-----------");
	   		console.log(movieObj.credits.Actors);
	   		

        // account for potential errors
        } else {
            console.log("Uh oh! An error occured: " + error);
        };
    });
};


// this function simply reads whatever's on the random.txt file and displays it
function doWhatItSays() {

    // use the fs node package so that the text in random.txt can be parsed
    fs.readFile("random.txt", "utf8", function(err, data){

		if (err){ 
			return console.log(err);
		}

        // split contents of random.txt on the comma
		var dataArr = data.split(',');
		checkInputs(dataArr[0], dataArr[1]);
	});
}


// ============================= CALL FUNCTIONS ============================

// Call my checkInputs function to initiate and wait for user inputs 
checkInputs(actionChoice, searchQuery);











