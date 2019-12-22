const express = require('express');

const router = express.Router();

const itemsController = require('../controllers/items');
const movieController = require('../controllers/movies');
const showController = require('../controllers/shows');
const personController = require('../controllers/persons');

router.get('/', itemsController.getHomePage);

router.get('/movies', movieController.getMoviesPage);
router.get('/movie/:itemId', movieController.getMovieDetailsPage);
router.post('/movie/:itemId/favorite', movieController.postFavoriteMovie);


router.get('/shows', showController.getShowsPage);
router.get('/show/:itemId', showController.getShowDetailsPage);
router.post('/show/:itemId/favorite', showController.postFavoriteShow);


router.get('/persons', personController.getPersonsPage);
router.get('/persons/:itemId', personController.getPersonDetailsPage);

router.get('/favorite', itemsController.getFavorite);



module.exports = router;