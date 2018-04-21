
var theMovieDBApi = {
  baseUrl: 'https://api.themoviedb.org/3',
  discoverUrl: '/discover/movie',
  configParams: {
    api_key: 'apikey',
    adult: false,
    page: Math.floor((Math.random() * 10) + 1)
  }
};

var MovieSearch = (function () {

  var movieList = [];

  var searchButtonId = '#search-button';
      likeButtonId = '#like-button';
      dislikeButtonId = '#dislike-button';

  var init = function() {
    getMovie();
    setSearchEvent();
  };
  
  var setSearchEvent = function() {
    $(searchButtonId).on('click', function(e) {
      e.preventDefault();
      getMovie();
    });

    $(likeButtonId).on('click', function(e) {
      e.preventDefault();
      
      var movie = getMovie();
      if (movie) Cookie.changeCookie({ includedGenders: movie.genre_ids });
    });

    $(dislikeButtonId).on('click', function(e) {
      e.preventDefault();
      
      var movie = getMovie();
      if (movie) Cookie.changeCookie({ excludedGenders: movie.genre_ids });
    });
  };

  var getMovie = function() {
    var movie;
    if (movieList.length > 0) {
      movie = chooseMovie(movieList);
      Drawer.drawSearchMovieResult(movie);
    } else {
      movie = requestMovie();
    }
    return movie;
  };

  var requestMovie = function() {

    $.ajax({
      dataType: 'json',
      url: theMovieDBApi.baseUrl + theMovieDBApi.discoverUrl,
      data: getParams(),
      success: function(response) {
        movieList = response.results.splice(0, 5);

        if (movieList.length > 0) {
          movie = chooseMovie(movieList);
          Drawer.drawSearchMovieResult(movie);
        } else {
          Cookie.create();
          requestMovie();
        }
      },
      error: function(error) {
        console.log('error', error)
        alert('Something went wrong! Try again later.');
      }
    });
  };

  var getParams = function(){
    var configMovieParams = theMovieDBApi.configParams;
    var nextMovieParams = chooseNextMoviesParams();

    var mergedParams = Object.assign( 
      configMovieParams,
      nextMovieParams
    );
    
    return mergedParams;
  };

  var chooseNextMoviesParams = function() {
    var nextMovieParams = {};
    var cookie = Cookie.getCookieObject();

    if (cookie) {
      if (cookie.excludedGenders) nextMovieParams.without_genres = cookie.excludedGenders.join();
      if (cookie.includedGenders) nextMovieParams.with_genres = cookie.includedGenders.join();
      if (cookie.includedActors) nextMovieParams.with_people = cookie.includedActors.join();
    }

    return nextMovieParams;
  };

  var chooseMovie = function(movieList) {
    return movieList.splice([Math.floor(Math.random() * movieList.length)], 1)[0];
  };

  return {
    init: init
  }

})()