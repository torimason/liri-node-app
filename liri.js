require("dotenv").config();
var inquirer = require("inquirer");
var request = require("request");
var keys = require("./key.js");
var zipcodes = require("zipcodes");
var Spotify = require("node-spotify-api");

var weatherKey = keys.openWeatherMap.key;
var spotifySecret = keys.spotifyKeys.secret;
var spotifyID = keys.spotifyKeys.id;
var command = " ";
var zip = " ";
var zipSearch = " ";
var city = " ";
var state = " ";
var country = " ";
var location = " ";
var song = " ";


 console.log(spotifyID);
 console.log(weatherKey);
 console.log(spotifySecret);

function whatToDo(){
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "What do you want to search?",
            choices: ["the weather" , "a song" , "a movie" , "random"]
        }
    ]).then(function(response){
        command = response.command;
        console.log(" ");
        console.log("......   initiating search for " + command + "   ......");
        console.log(" ");
        if (command === "the weather"){
            weatherSearch();
        }
        else if (command === "a song"){
            spotifySearch();
        }
    });
};

function weatherSearch(){
    inquirer.prompt([
        {
            type: "input",
            name: "zipcode",
            message: "What is the zipcode?"
        }
    ]).then(function(response){
        zip = response.zipcode;
        zipSearch = zipcodes.lookup(zip);
        if(zipSearch === undefined){
            console.log(" ");
            console.log("!!===========   ERROR CANNOT PERFORM SEARCH   ===========!!");
            console.log(" ");
            console.log("               **   Try Another ZipCode   **");
            console.log(" ");
        }
        else{
            city = zipSearch.city;
            state = zipSearch.state;
            country = zipSearch.country;
            location = city + ", " + state;
            console.log(" ");
            console.log("......   searching weather for " + location + "   ......");
            console.log(" ");
            request("http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + country + "&APPID=" + weatherKey, 
            function(err , response) {
                console.log(response.body);
            });
        }
    });
}

function spotifySearch(){
    inquirer.prompt([
        {
            type: "input",
            name: "songname",
            message: "What is the name of the song?"
        }
    ]).then(function(response){
        song = response.songname;
        var spotify = new Spotify(keys.spotifyKeys);
        spotify.search({type: "track" , query: song}, function(err, data){
            if(err){
                return console.log(" ");
                console.log("!!===========   ERROR CANNOT PERFORM SEARCH   ===========!!");
                console.log(" ");
                console.log("                   **   Try Again   **");
                console.log(" ");
            }
            else{
            console.log(data);
            }
        })
    })
}
    
  
function liri(){
    console.log("   ");
    console.log("===================   HELLO, MY NAME IS LIRI   ===================");
    console.log("   ");
    whatToDo();
}
 
liri();