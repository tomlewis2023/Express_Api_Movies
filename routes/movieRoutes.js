const express = require("express");
const router = express.Router();
const moviestore = require("../data/moviedata");

//get all movies

router.get("/", (req, res) => {
  try {
    res.status(200).json(moviestore);
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});

//get movies by id

router.get("/:id", (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    const movie = moviestore.find((mov) => mov.id === movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error: error.messsage });
  }
});

//Post requests

router.post("/", (req, res) => {
  try {
    if (!req.body)
      return res
        .status(404)
        .json({ message: "title ,genre,releaseYear,rating are required" });
    const { title, genre, releaseYear, rating } = req.body;
    const newMovie = {
      id: moviestore.length ? moviestore[moviestore.length - 1].id + 1 : 1,
      title: title,
      genre: genre,
      releaseYear: releaseYear,
      rating: rating,
    };

    moviestore.push(newMovie);
    res.status(201).json({ message: "Movie added", movie: newMovie });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//update requests

router.patch("/:id", (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    const movie = moviestore.find((mov) => mov.id === movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const { title, genre, releaseYear, rating } = req.body;
    if (title) movie.title = title;
    if (genre) movie.genre = genre;
    if (releaseYear) movie.releaseYear = releaseYear;
    if (rating) movie.rating = rating;

    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error: error.messsage });
  }
});

//delete request
router.delete("/:id", (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    const movieIndex = moviestore.findIndex((mov) => mov.id === movieId);

    if (movieIndex == -1) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const deleteMovie = moviestore.splice(movieIndex, 1);

    res.status(200).json({ message: "movie deleted", movie: deleteMovie });
  } catch (error) {
    res.status(404).json({ error: error.messsage });
  }
});

module.exports = router;
