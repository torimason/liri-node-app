# liri-node-app

LIRI is a command line node app that takes in inquire inputs and returns data based on one of three commands:

  * "the weather"

  * "a song"

  * "movie-this"

## Searches

1. "the weather"

  * Prompts the user to input a zipcode, then uses zipcode and displays the following in the terminal.
    *City and State name
    *Current weather status
    *Current temp
    *High Temp
    *Low Temp
    *Humidity
    *Wind Speed
    
   * Or if no zipcode is passed through, it will give an error and re initiate the search.

2. "a song"

  * Shows the following information about the song in terminal.
    * Artist
    * Song name
    * Spotify link
    * Album name

  * Or if no song is passed through, it will give an error and re initiate the search.

3. "a movie"

  * Shows the following information in terminal.

    * Movie Title
    *Release Date
    *IMDB Rating
    *Rotten Tomatoes Rating
    *Country of production
    *Language
    *Short Plot
    *Actors

  * Or if no movie is passed through, it will give an error and re initiate the search.

## Tech
- Node.js
- OpenWeatherMap API
- OMDB API
- Inquirer NPM Package -https://www.npmjs.com/package/inquirer
- Spotify NPM Package - https://www.npmjs.com/package/spotify
- Request NPM Package - https://www.npmjs.com/package/request
- DotEnv NPM Package - https://www.npmjs.com/package/dotenv
- Zipcodes NPM Package - https://www.npmjs.com/search?q=zipcodes
