let newInf = [];
function newMovieData(id, title, vote_average, adult, original_language) {
    this.id = id
    this.title = title,
        this.vote_average = vote_average
    this.adult = adult,
        this.original_language = original_language,
        newInf.push(this)
}
module.exports=newMovieData