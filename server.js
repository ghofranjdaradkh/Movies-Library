`use strict`
const express = require("express");
const app = express();

let uniData = require("./ MovieData/data.json");
const cors = require("cors");
let axios = require("axios")
require('dotenv').config();
app.use(cors())

app.listen(3000, startingLog)
function startingLog(req, res) {
    console.log("Running at 3000")
}


//for Routes trending and search 
let allinfo = [];
function moviesLibrary(id, title, release_date, poster, overview) {
    this.id = id
    this.title = title,
    this.release_date = release_date
    this.poster_path = poster,
    this.overview = overview,
     allinfo.push(this)
}


//for routes discover , popular
let newInf = [];
function newMovieData(id, title, vote_average,adult,original_language ) {
    this.id = id
    this.title = title,
    this.vote_average =vote_average
    this.adult=adult,
    this.original_language=original_language,
     newInf.push(this)
}
//Routes
app.get('/', handleData)
app.get('/favorite', handleFavorite)

app.get('/trending', async (req, res) => {

    let axiosRes = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}&language=en-US`)
    const allMovieInfo = [];
    for (let i = 0; i < axiosRes.data.results.length; i++) {
        const data = axiosRes.data.results[i];
        const movieInfo = new moviesLibrary(data.id, data.title, data.release_date, data.poster_path, data.overview
        )
        allMovieInfo.push(movieInfo)
    }
    res.send(allMovieInfo)
});



app.get('/search', async (req, res) => {
    const movieName = req.query.name
    let axiosRes2 = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${movieName}&page=2`)
    const allMovieInfo = [];
    for (let i = 0; i < axiosRes2.data.results.length; i++) {
        const data = axiosRes2.data.results[i];
        const movieInfo = new moviesLibrary(data.id, data.title, data.release_date, data.poster_path, data.overview
        )
        allMovieInfo.push(movieInfo)
    }
    res.send(allMovieInfo)
});



app.get('/discover',async (req, res) => {
   
    let axiosRes5 = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.API_KEY}`);
    const newMovieInfo = [];
        for (let i = 0; i < axiosRes5.data.results.length; i++) {
            const data = axiosRes5.data.results[i];
            
            const movieInfo = new newMovieData(data.id, data.title, data.vote_average,data.original_language, data.adult)
            
            newMovieInfo.push(movieInfo)
        }
        res.send(newMovieInfo)



    
});

app.get('/popular',async (req, res) => {

        let axiosRes6 = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.API_KEY}`)
        const newMovieInfo = [];
            for (let i = 0; i < axiosRes6.data.results.length; i++) {
                const data = axiosRes6.data.results[i];
                
                const movieInfo = new newMovieData(data.id, data.title, data.vote_average,data.original_language, data.adult)
                
                newMovieInfo.push(movieInfo)
            }
            res.send(newMovieInfo)
        });
        


    
   //new extra route  
app.get('/languages',async (req, res) => {
   
    let axiosRes4 = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.API_KEY}`);
    res.send(axiosRes4.data)
});
    
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
        
    });
}


function errorHandler(error, req, res, next) {
    const err = {
        status: 500,
        responseText: "Sorry,something went wrong"
    }
    res.status(500).send(err);
}







    