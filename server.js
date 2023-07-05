`use strict`
const express = require("express");
const app = express();
const moviesRouteAxios=require('./Routes/moviesRouteAxios')
const moviesRouteDB=require('./Routes/moviesRouteDB')

const {PORT} =require('./config')//destrucring 

const client =require('./client')
const NotFound=require('./errors/404')
const serverError=require('./errors/500')

const cors = require("cors");

require('dotenv').config();
app.use(cors())
app.use(express.json())
app.use('/movies',moviesRouteDB)
app.use(moviesRouteAxios)


app.use(NotFound)// use as middlewire
app.use(serverError)// use as middlewire

client.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`)
    });
})






