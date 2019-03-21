LIRI Bot
==============================================

A command line node app I made that takes in parameters and gives you back data by using the Axios package to make calls to the Bands in Town, Spotify and OMDB APIs.

## How to Deploy the App:

1. Clone this repository down to your machine
   
2. Run `npm install` in your command line to download the required packages
   
3. At the command prompt, enter `node liri <pass in a command depending on what you want LIRI Bot to do>`
   
  Command options: 

+ `node liri.js concert-this "<artist/band name here>"`: queries the Bands in Town API and displays upcoming concert information
  
+ `node liri.js spotify-this-song "<song name here>"`: queries the Spotify API and displays data about the song
  
+ `node liri.js movie-this "<movie name here>"`: queries the OMDB API and displays data about the movie
  
+ `node liri.js do-what-it-says`: displays whatever's written in the random.txt file

## Technologies Used:

+ Logic for the app was written with **JavaScript**.
  
+ **Node.JS** for the app's server environment.
  
+ 3 different **API's**: 
  + Spotify
  + Bands in Town
  + OMDB
  
+ **NPM** for installation of various packages required by the app, including **Node-Spotify-API**, **fs**, **axios**, **moment**, and **DotEnv**.

## LIRI Bot in Action:

![demo gif](/LIRI-demo.gif "Demo GIF")

## Author

Thor Nolan