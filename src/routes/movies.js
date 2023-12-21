const express = require('express');
const router = express.Router();


const MoviesController = require('../controllers/MoviesController');


/// Add Movie 

// http://localhost:3000/movies/add
router.post('/add', async (req, res) => {MoviesController.addMovie(req, res, database)})



// const movies = req.body; 

// movies.forEach((movie) => {
//   const { imdbID, Title, Year, Poster } = movie;
//   const query = 'INSERT INTO MOVIES (imdbID, title, year, poster) VALUES (?, ?, ?, ?)';
//   database.query(query, [imdbID, Title, Year, Poster]);
// });

module.exports = router;