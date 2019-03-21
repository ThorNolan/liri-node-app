require("dotenv").config();

// =============================== VARIABLES =================================

// variables to keep track of required NPM packages
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
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
   axios.get(URL).then(function(response) {

   
  });
}

// function to make a call to the Spotify API and display song data using its' built-in search funcitonality
function spotifySearch(songName) {

    spotify.search({ type: "track", query: songName}, function(err, data) {

        // account for potential errors and log them to the console
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

  // if the user doesn't enter any movie name, use the default movie "Mr. Nobody"  
  if (movieName === "") {
    movieName = defaultMovie;
  } else {

    // Create new request to the OMDB API using the movie name entered by the user
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

	//request(queryURL, function(error, response, response) {
    axios.get(queryURL).then(function(response) {
        
        //console.log(response)

        // Console.log out the movie data to the user
	    console.log("--------Title-----------");
        console.log(response.data.Title);
            
	    console.log("--------Year Released-----------");
	    console.log(response.data.Year);

	   	console.log("--------IMDB Rating-----------");
	   	console.log(response.data.imdbRating);
            
	   	console.log("--------Rotten Tomatoes Rating-----------");
        console.log(response.data.Ratings[2].Value);
	   		
	   	console.log("--------Plot----------------");
	   	console.log(response.data.Plot);

	   	console.log("--------Actors-----------");
        console.log(response.data.Actors);
             
        console.log("--------Country Produced-----------");
	   	console.log(response.data.Country);
	   		
	   	console.log("--------Languages-----------");
        console.log(response.data.Language);
        
        // use fs to log the info from the user's search to the log.txt file
        fs.appendFile("log.txt", actorData + divider, function(err) {
            if (err) throw err;
        });
    },
    // account for potential errors
    function(error){
        console.log("Uh oh! An error occured: " + error);
    });
  }
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











