`use strict`
const express=require('express')

const RouteDB= express.Router()

const client=require('../client')

//movies with post method==addMovies
RouteDB.post("/", (req, res,next) => {
    try {const { title, release_date, overview, comment } = req.body;
    let sql = `INSERT INTO moviesdata (title,release_date, overview ,comment) VALUES ($1,$2,$3,$4)`;
    client.query(sql, [title, release_date, overview, comment]).then(() => {
        res.status(201).send(`Movie ${title} added to database if you want to see  data go to route /getMovies `);
    });
        
    } catch (error) {
        next(`addMovie ${error}`)
        
    }
    
});

RouteDB.get("/", (req, res,next) => {
    try { let sql = `SELECT * FROM moviesdata`;
    client.query(sql).then((moviesData) => {
        res.status(200).send(moviesData.rows);
    });
   
    } catch (error) {
       next(`getMovies:${error}`) 
    }
   
})

RouteDB.delete('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let sql = `DELETE FROM moviesdata WHERE id =${id}`
        await client.query(sql)
        res.status(204).end()
    }
    catch (error) {
        next("delete movie" + error)
    }
})



RouteDB.put('/:id',async (req, res,next) => {
    try{
    let { comment } = req.body;

    let sql = `UPDATE moviesdata SET comment=$1 WHERE id=${req.params.id}`;
     await client.query(sql, [comment])
    res.status(200).send("updated movie data")}

     catch(error){
  next(`updated: ${error}`)}
});

RouteDB.get("/:id", ((req, res,next) => {
    try { let id =req.params.id
        let sql = `SELECT * FROM moviesdata WHERE id =${id}`;
        client.query(sql).then((moviesData) => {
            res.status(200).send(moviesData.rows[0]);
        });
        
    } catch (error) {
        next(`updated :${error}`)
        
    }
    

}))


module.exports=RouteDB