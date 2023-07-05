
const pg = require("pg");

 const {DB_URL}=require('./config')

const client = new pg.Client(DB_URL)// must require pg library and defined DB_URL

module.exports=client