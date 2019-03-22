require("dotenv").config();

// =============================== VARIABLES =================================

// variables to keep track of required NPM packages
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var chalk = require("chalk");

// time variable using moment to format concert times and keep track of logs to my logs.txt file
var time = moment().format('HH:mm:ss');

// divider to put between logs to the log.txt file for clarity
var divider = "\n------------------------------------------------------------\n\n";

// local variable to store my spotify key exported from keys.js
var spotify = new Spotify(keys.spotify);


// default search values for omdb and spotify if user fails to input or input is undefined
var defaultMovie = "Mr. Nobody";
var defaultSong = "Never Gonna Give You Up";


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
            // ask user to enter an artist if they fail to do so
            if (searchQuery === undefined) {
                console.log(chalk.red("Please enter an artist!"));
            }
            concertSearch(searchQuery);
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
            console.log(chalk.red("Not a valid command! Please try again."));
    }
}   

// function to make a call to the Bands In Town API and display upcoming concert info
function concertSearch(artistName) {

    // create local variable to hold my query URL
    var queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";


    axios.get(queryURL).then(function (response) {
        //console.log(response)
           
        for (var i = 0; i < response.data.length; i++) {
            console.log(chalk.blue("--------Venue Name-----------"));
            console.log(chalk.bold(response.data[i].venue.name));
            console.log(chalk.blue("-------Venue Location---------"));
            console.log(chalk.bold(response.data[i].venue.city + ", " + response.data[i].venue.country));
            console.log(chalk.blue("-------Concert Date---------"));
            console.log(chalk.bold(moment(response.data[i].datetime).format("L")));
            console.log(chalk.blue(divider));
        }
        
    }).catch(function (error) {
        console.log(chalk.red("Uh oh! An error occured: " + error));
    });  
}

// function to make a call to the Node-Spotify-API and display song data using its' built-in search functionality
function spotifySearch(songName) {

    spotify.search({ type: "track", query: songName}, function(err, data) {

        // account for potential errors and log them to the console
        if (err) {
            console.log(chalk.red("Uh oh! An error occurred: " + err));
            return;
        }

        // store song data in a local variable
        var song = data.tracks.items[0];

        // console.log out the data from the API call about the searched song
        console.log(chalk.green("------Artists-----"));
        for(i = 0; i < song.artists.length; i++){
            console.log(chalk.bold(song.artists[i].name));
        }

        console.log(chalk.green("------Song Name-----"));
        console.log(chalk.bold(song.name));

        console.log(chalk.green("-------Preview Link-----"));
        if (song.preview_url !== null) {
            console.log(chalk.bold(song.preview_url));
        } else if (song.preview_url === null){
            console.log("Sorry, no preview link available for this song.");
        }

        console.log(chalk.green("-------Album-----"));
        console.log(chalk.bold(song.album.name));
        console.log(chalk.green(divider));

    });  
}

// function to make a call to the OMDB API using the axios package and display movie data
function movieSearch(movieName) {

    // Create new request to the OMDB API using the movie name entered by the user
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

	//request(queryURL, function(error, response, response) {
    axios.get(queryURL).then(function(response) {
        
        //console.log(response)

        // Console.log out the movie data to the user
	    console.log(chalk.yellow("--------Title-----------"));
        console.log(chalk.bold(response.data.Title));
            
	    console.log(chalk.yellow("--------Year Released-----------"));
	    console.log(chalk.bold(response.data.Year));

	   	console.log(chalk.yellow("--------IMDB Rating-----------"));
	   	console.log(chalk.bold(response.data.imdbRating));
            
	   	console.log(chalk.yellow("--------Rotten Tomatoes Rating-----------"));
        console.log(chalk.bold(response.data.Ratings[2].Value));
	   		
	   	console.log(chalk.yellow("--------Plot----------------"));
	   	console.log(chalk.bold(response.data.Plot));

	   	console.log(chalk.yellow("--------Actors-----------"));
        console.log(chalk.bold(response.data.Actors));
             
        console.log(chalk.yellow("--------Country Produced-----------"));
	   	console.log(chalk.bold(response.data.Country));
	   		
	   	console.log(chalk.yellow("--------Languages-----------"));
        console.log(chalk.bold(response.data.Language));
        
        console.log(chalk.yellow(divider));

        // use fs to log the info from the user's search to the log.txt file
        // fs.appendFile("log.txt", actorData + divider, function(err) {
        //     if (err) throw err;
        // });
    },
    // account for potential errors from my axios call
    function(error){
        console.log(chalk.red("Uh oh! An error occured: " + error));
    });
};


// this function simply reads whatever's on the random.txt file and displays it
function doWhatItSays() {

    // use the fs node package so that the text in random.txt can be parsed
    fs.readFile("random.txt", "utf8", function(err, data){

		if (err){ 
			return console.log(chalk.red("Uh oh! An error occured: " + err));
		}

        // split contents of random.txt on the comma
		var dataArr = data.split(',');
		checkInputs(dataArr[0], dataArr[1]);
	});
}


// ============================= CALL FUNCTIONS ============================

// Call my checkInputs function to initiate and wait for user inputs 
checkInputs(actionChoice, searchQuery);











