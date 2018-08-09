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
var movie = "";
var queryUrl = " ";

function whatToDo(){
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "What do you want to search?",
            choices: ["the weather" , "a song" , "a movie"]
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
        else if (command === "a movie"){
            movieSearch();
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
            function(err , response , body) {
                var parsedData = JSON.parse(body);
                var convertedCurrent = ((parsedData.main.temp - 273.15) * 1.80 + 32);
                var convertedHigh = ((parsedData.main.temp_max - 273.15) * 1.80 + 32);
                var convertedLow = ((parsedData.main.temp_min - 273.15) * 1.80 + 32);
                console.log("");
                console.log("------------------------------");
                console.log("");
                console.log(location);
                console.log("");
                console.log(parsedData.weather[0].main);
                console.log("Current Temp: " +  Math.round(convertedCurrent) + " F");
                console.log("High: " + Math.round(convertedHigh) + " F");
                console.log("Low: " + Math.round(convertedLow) + " F");
                console.log("Humidity: " + parsedData.main.humidity);
                console.log("Wind Speed: " + parsedData.wind.speed);
                console.log("");
                console.log("------------------------------");
                searchAgain();
            });
        };
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
        spotify.search({type: "track" , query: song , limit: 1}, function(err, data){
            if(err){
                return console.log(" ");
                console.log("!!===========   ERROR CANNOT PERFORM SEARCH   ===========!!");
                console.log(" ");
                console.log("                   **   Try Again   **");
                console.log(" ");
            }
            else{
                console.log(" ");
                console.log("......   searching information for " + data.tracks.items[0].name + "   ......");
                console.log(" ");
                console.log(" ");
                console.log("------------------------------");
                console.log(" ");
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Listen Now: " + data.tracks.items[0].album.external_urls.spotify);
                console.log(" ");
                console.log("------------------------------");
                searchAgain();
            };
        });
    });
};

function movieSearch(){
    inquirer.prompt([
        {
            type: "input",
            name: "movieName",
            message: "What is the name of the movie?"
        }
    ]).then(function(response){
        movie = response.movieName
        queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
        request(queryUrl , function(error, response, body){
            if(!error && response.statusCode === 200) {
                var parseMovie = JSON.parse(body)
                console.log(" ");
                console.log("......   searching information for " + parseMovie.Title + "   ......");
                console.log(" ");
                console.log(" ");
                console.log("------------------------------");
                console.log("");
                console.log(parseMovie.Title);
                console.log("");
                console.log("Released: " + parseMovie.Released);
                console.log("IMDB Rating: " + parseMovie.imdbRating);
                console.log("Rotten Tomatoes Rating: " + parseMovie.Ratings[1].Value);
                console.log("Produced in: " + parseMovie.Country);
                console.log("Language: " + parseMovie.Language);
                console.log("Plot: " + parseMovie.Plot);
                console.log("Actors: " + parseMovie.Actors);
                console.log("");
                console.log("------------------------------");
                searchAgain();
            };
        });
    });

   
};

function searchAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "again",
            message: "Would you like to search something else?",
            default: false
        }
    ]).then(function(response){
        if(response.again === true){
            whatToDo();
        }
        else{
            console.log("   ");
            console.log("===================   GOODBYE   ===================");
            console.log("   ");
        }
    })
    
}

function liri(){
    console.log("   ");
    console.log("===================   HELLO, MY NAME IS LIRI   ===================");
    console.log("   ");
    whatToDo();
}
 
liri();