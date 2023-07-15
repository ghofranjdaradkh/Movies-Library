`use strict`// to avoid mistakes and make sure cleaner code written 
const express = require("express");//library to build our server in JS 
// express is function ....to create server we must invoke this function and hold it in variable(app)
const app = express()
const moviesRouteAxios=require('./Routes/moviesRouteAxios')
const moviesRouteDB=require('./Routes/moviesRouteDB')

const {PORT} =require('./config')//destrucring 

const client =require('./client')
const NotFound=require('./errors/404')
const serverError=require('./errors/500')


const cors = require("cors");//any one can acsess my server

require('dotenv').config();
app.use(cors())
app.use(express.json())
app.use('/movies',moviesRouteDB) // may be we use middle ware here because we use three parameter (req,res,next)try and catch
app.use(moviesRouteAxios) //  to select spasific route we use app middle ware



app.use(NotFound)// use as middlewire error hanler
app.use(serverError)// use as middlewire error hanler

client.connect().then(() => {
    app.listen(PORT, () => {
// listen is method from express library to keep my server listening to requests
        console.log(`Listening at ${PORT}`)
    });
})




