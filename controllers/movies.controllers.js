exports.getAllMovies = async (req, res, next) => {
  const categoryToFetch = ["top_rated", "upcoming", "popular", "now_playing"];
  try {
    const allMovies = Promise.all(
      categoryToFetch.map(async (category) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
        );
        const json = await response.json();
        const arrayOfMovies = json.results;
        return arrayOfMovies;
      })
    );
    const promiseResult = await allMovies;
    const topTenPlaylist = JSON.parse(JSON.stringify(promiseResult[2])).splice(
      0,
      10
    );
    const ObjectOfMoviesByGenre = {
      top_rated: promiseResult[0],
      upcoming: promiseResult[1],
      popular: promiseResult[2],
      now_playing: promiseResult[3],
      topTenPlaylist,
    };
    res.json(ObjectOfMoviesByGenre);
  } catch (e) {
    next(e);
  }
};

exports.getTrailer = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      );
      const video = await response.json();
      const trailerArray = video.results;
      const trailer = trailerArray.filter((trailer) => {
        switch (trailer.type) {
          case "Trailer":
            return trailer;
          case "Teaser":
            return trailer;
          default:
            return null;
        }
      });
      if (trailer.length > 0) {
        res.json({ trailer: trailer[0].key });
      } else {
        res.json({ trailer: null });
      }
    }
  } catch (e) {
    next(e);
  }
};

exports.getMoviesByPage = async (req, res, next) => {
  const { category, page } = req.params;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
    );
    const movieData = await response.json();
    res.json({ movieData });
  } catch (e) {
    next(e);
  }
};

exports.inputSearchMovie = async (req, res, next) => {
  const { searchMovie, page } = req.params;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}&query=${searchMovie}`
    );
    const movieResults = await response.json();
    res.json({ movieResults });
  } catch (e) {
    next(e);
  }
};
