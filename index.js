function unique(array) {
  return $.grep(array, function(el, index) {
    return index === $.inArray(el, array);
  });
}

var Drawer = (function() {
  var resultsSectionId = '#results-section';

  var drawSearchMovieResult = function(movie) {
    $(resultsSectionId).empty();
    $(resultsSectionId).html(`
      <div>
        <h3>${movie.title}<h3>
        <img src=http://image.tmdb.org/t/p/w200/${movie.poster_path}>
      </div> 
    `);
  }

  return { drawSearchMovieResult: drawSearchMovieResult }
})()

$(document).ready(function() {
  MovieSearch.init();
});
