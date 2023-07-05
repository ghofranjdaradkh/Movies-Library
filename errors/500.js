module.exports=((error, req, res, next)=> {
    const err = {
        status: 500,
        responseText: "Sorry,something went wrong",
        method:req.method,
        end_point:req.url
        
    }
    res.status(500).send(err);
})