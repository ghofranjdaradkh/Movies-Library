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



//Routes
app.get('/', handleData)
app.get('/favorite', handleFavorite)
app.use(notFoundHandler)
app.use(errorHandler);


function handleData(req, res) {

    try {
        const movie = new moviesLibrary(uniData.title, uniData.poster_path, uniData.overview);

        // Send the instance as a JSON response
        res.json(movie);
    }

    catch (error) {
        errorHandler(error, req, res, next)
        
    }
}


function handleFavorite(req, res) {
    res.send("Welcome to Favorite Page")

}


function notFoundHandler(req, res) {
    res.status(404).send({
        code: 404,
        message: "Not Found",
        extra: "you can visit only home, allinfo and allnames routes ",
    });
}


function errorHandler(error, req, res, next) {
    const err = {
        status: 500,
        responseText: "Sorry,something went wrong"
    }
    res.status(500).send(err);
}


let allinfo = [];
function moviesLibrary(title, poster, overview) {
    this.title = title,
        this.poster_path = poster,
        this.overview = overview,
        allinfo.push(this)
}