function unique(array) {
  return $.grep(array, function(el, index) {
    return index === $.inArray(el, array);
  });
}

var Drawer = (function() {
  var resultsArticleId = "#results-article";
  var movieTitle = "#movie-title";
  var movieImage = "#movie-img";
  var movieDescription = "#description-text";

  var drawSearchMovieResult = function(movie) {
    console.log('movie', movie);
    $(movieTitle).text(movie.title);
    $(movieImage).attr("src", "http://image.tmdb.org/t/p/w342/" + movie.poster_path);
    $(movieDescription).text(movie.overview);
  }

  return { drawSearchMovieResult: drawSearchMovieResult }
})()

$(document).ready(function() {
  MovieSearch.init();
});