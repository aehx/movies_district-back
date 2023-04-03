const { addFavoritesMovie } = require("../queries/user.queries");

exports.addToWatchlist = async (req, res, next) => {
  const { username, movieId } = req.body;
  try {
    const watchlist = await addFavoritesMovie(username, movieId);
    res.json(watchlist?.watchList);
  } catch (e) {
    next(e);
  }
};

exports.getUserMovies = async (req, res, next) => {
  const { movieIds } = req.body;
  try {
    if (!!req.user) {
      if (movieIds && movieIds.length > 0) {
        const promiseResponse = await Promise.all(
          movieIds.map(async (movieId) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
            );
            const data = await response.json();
            return data;
          })
        );
        res.json({ watchList: promiseResponse });
      } else {
        res.json({ watchList: [] });
      }
    } else {
      res.json({ error: "Don't have permission" });
    }
  } catch (e) {
    next(e);
  }
};
