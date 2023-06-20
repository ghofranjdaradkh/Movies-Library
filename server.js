`use strict`
const express = require("express");
const app = express();

let uniData = require("./ MovieData/data.json");

const cors = require("cors");
app.use(cors())

app.listen(3000, startingLog)
function startingLog(req, res) {
    console.log("Running at 3000")
}


// let x={
//     "title": "Spider-Man: No Way Home",
//     "genre_ids": [
//     28,
//     12,
//     878
//     ],
//     "original_language": "en",
//     "original_title": "Spider-Man: No Way Home",
//     "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
//     "video": false,
//     "vote_average": 8.4,
//     "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
//     "release_date": "2021-12-15",
//     "vote_count": 3160,
//     "id": 634649,
//     "adult": false,
//     "backdrop_path": "/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg",
//     "popularity": 10039.54,
//     "media_type": "movie"
// }

//Routes
app.get('/', handleData)
app.get('/favorite', handleFavorite)
app.get('*', notFoundHandler)
app.get('/', errorHandler)
app.use(errorHandler)

function handleData(req, res) {
    
        try {   
            const filteredObject = {};
        for (const key in uniData) {
            if (key === 'title' || key === 'overview' || key === 'poster_path') {
                filteredObject[key] = uniData[key];
            }
        }

        res.json(filteredObject);
    
            // res.send(filteredObjects);
               
        }
              
            
          
        catch (error) {
            console.error(error);
          
            res.send({"status": 500,
            "responseText": "Sorry, something went wrong"});
        }
}


function handleFavorite(req, res) {
    res.send("Welcome to Favorite Page")

}


function notFoundHandler(req, res) {
    res.send({
        code: 404,
        message: "Not Found",
        extra: "you can visit only home, allinfo and allnames routes ",
      });
    }


function errorHandler(error, req, res) {
    const err = {
        status: 500,
        responseText: "Sorry,something went wrong"
    }
    res.status(500).send(err);
}


let allinfo=[];
function moviesLibrary(title, ids, languge, origTitle, poster, video, average, overview, releaseDate, voteCount, id, adult, backdrop, popularity, media) {
        this.title = title,
        this.genre_ids = ids,
        this.original_language = languge,
        this.original_title = origTitle,
        this.poster_path = poster,
        this.video = video,
        this.vote_average = average,
        this.overview = overview,
        this.release_date = releaseDate,
        this.vote_count = voteCount,
        this.id = id,
        this.adult = adult,
        this.backdrop_path = backdrop,
        this.popularity = popularity,
        this.media_type =media,
        allinfo.push(this)


}