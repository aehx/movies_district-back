exports.getAllMoviesByGenre = async (req, res, next) => {
  const wordArray = [
    "upcoming",
    "top_rated",
    "popular",
    "latest",
    "now_playing",
  ];
  const { category } = req.params;
  const word = category.split(":").join("");
  if (wordArray.includes(word)) {
    req.array();
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${word}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
      );
      const movieData = await response.json();
      res.json({ movieData });
    } catch (e) {
      next(e);
    }
  } else {
    throw new Error("Invalid");
  }
};

exports.getTrailer = async (req, res, next) => {
  const { id } = req.params;
  req.array();
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    const video = await response.json();
    res.json({ video });
  } catch (e) {
    next(e);
  }
};

exports.getMoviesByPage = async (req, res, next) => {
  const { category, page } = req.params;
  req.array();
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
  req.array();
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
