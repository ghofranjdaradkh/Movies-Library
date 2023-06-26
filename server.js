`use strict`
const express = require("express");
const app = express();
const pg = require("pg");

let uniData = require("./ MovieData/data.json");
const cors = require("cors");
let axios = require("axios")
require('dotenv').config();
app.use(cors())
app.use(express.json())
// app.use(express.json()); 

const PORT = process.env.PORT;
const DB_URL=process.env.DATABASE_URL;


const client =new pg.Client(DB_URL)
client .connect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening at ${PORT}`)
       });
})


app.get('/',(req,res)=>{res.status(200).send(`main route `)})

app.post("/addMovie", (req, res) => {
    const { title ,author,release_date, original_language, Genre, overview ,Main_cast, Awards} = req.body;
    let sql = `INSERT INTO movies ( title,author,release_date, original_language, Genre, overview ,Main_cast, Awards) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
    client.query(sql, [title ,author,release_date, original_language, Genre, overview ,Main_cast, Awards]).then(() => {
  res.status(201).send(`Movie ${title} added to database if you want to see go to route /getMovies `);
});
});
app.get("/getMovies",(req, res) => {
    let sql = `SELECT * FROM movies`;
    client.query(sql).then((moviesData) => {
      res.status(200).send(moviesData.rows);
    });

})




//to handle error

app.use(notFoundHandler)
app.use(errorHandler);

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







    