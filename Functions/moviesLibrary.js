let allinfo = [];
function moviesLibrary(id, title, release_date, poster, overview) {
    this.id = id
    this.title = title,
        this.release_date = release_date
    this.poster_path = poster,
        this.overview = overview,
        allinfo.push(this)
}
module.exports=moviesLibrary