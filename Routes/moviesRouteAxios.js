`use strict`
const express=require('express')
let axios = require("axios")
let uniData = require("../ MovieData/data.json");
const RouteAxios=express.Router();
require('dotenv').config();
const moviesLibrary=require('../Functions/moviesLibrary')
const newMovieData=require('../Functions/newMovieData')











RouteAxios.get('/', (req, res)=> {

    try {
        const movie = new moviesLibrary(uniData.title, uniData.poster_path, uniData.overview);
        // Send the instance as a JSON response
        res.json(movie);
    }

    catch (error) {
        next(`main route +${e}`)

    }
})
RouteAxios.get('/favorite',(req,res,next)=>{
    try {res.send("Welcome to Favorite Page")}
    catch(error){
        next(`favorite route +${e}`)

    }
    
} )

RouteAxios.get('/trending', async (req, res,next) => {

    try{
        let axiosRes = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}&language=en-US`)
    const allMovieInfo = [];
    for (let i = 0; i < axiosRes.data.results.length; i++) {
        const data = axiosRes.data.results[i];
        const movieInfo = new moviesLibrary(data.id, data.title, data.release_date, data.poster_path, data.overview
        )
        allMovieInfo.push(movieInfo)
    }
    res.send(allMovieInfo)}
    catch (error){
        next(`trending route +${e}`)
    }
});
    



RouteAxios.get('/search', async (req,res,next) => {
    try {
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
    } catch (error) {
        next(`search route +${e}`)

        
    }

    
});



RouteAxios.get('/discover', async (req,res,next) => {

    try{
    let axiosRes5 = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.API_KEY}`);
    const newMovieInfo = [];
    for (let i = 0; i < axiosRes5.data.results.length; i++) {
        const data = axiosRes5.data.results[i];

        const movieInfo = new newMovieData(data.id, data.title, data.vote_average, data.original_language, data.adult)

        newMovieInfo.push(movieInfo)
    }
    res.send(newMovieInfo)}
    catch(error){
        next (`discover route +${e}`)
    }




});

RouteAxios.get('/topRated', async (req,res,next) => {
    try {

    let axiosRes6 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${process.env.API_KEY}`)
    const newMovieInfo = [];
    for (let i = 0; i < axiosRes6.data.results.length; i++) {
        const data = axiosRes6.data.results[i];

        const movieInfo = new newMovieData(data.id, data.title, data.vote_average, data.original_language, data.adult)

        newMovieInfo.push(movieInfo)
    }
    res.send(newMovieInfo)}
    catch(error){
        next(`topRated route +${e}`)
    }
});




//new extra route  
RouteAxios.get('/languages', async (req, res,next) => {
    try {let axiosRes4 = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.API_KEY}`);
    res.send(axiosRes4.data)
        
    } catch (error) {
        next(`languages route ${error}`)
        
    }

    
});


module.exports=RouteAxios