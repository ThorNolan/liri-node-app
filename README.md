LIRI Bot
==============================================

A command line node app I made that takes in parameters and gives you back data by using the Axios package to make calls to the Bands in Town, Spotify and OMDB APIs.

## How to Deploy the App:

1. Clone this repository down to your machine
   
2. Run `npm install` in your command line
   
3. At the command prompt, enter `node liri.js <pass in a command depending on what you want LIRI Bot to do>`
   
+ Command options: 

   + `node liri.js concert-this <artist/band name here>`
   + `node liri.js spotify-this-song '<song name here>'`
   + `node liri.js movie-this '<movie name here>'`
   + `node liri.js do-what-it-says`

## Technologies Used:

+ Logic for the app was written with **JavaScript**.
  
+ **Node.JS** for the app's server environment.
  
+ 3 different **API's**: 
  + Spotify
  + Bands in Town
  + OMDB
  
+ **NPM** for installation of various packages required by the app.

## Author

Thor Nolan