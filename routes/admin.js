const path = require('path');

const express = require('express');

const adminController =  require("../controllers/admin");
const isAuth = require("../middleware/is_auth");

const router = express.Router();

router.get('/', isAuth, adminController.getAdminPage);
router.post('/add-movie', adminController.postNewMovieApi);
router.post('/add-show', adminController.postNewShowApi);

router.get('/movie/:itemId/edit', adminController.getMovieEditPage);
router.post('/movie/:itemId/', adminController.postEditedMovie);
router.post('/movie/:itemId/delete', adminController.postDeleteMovie);

router.get('/show/:itemId/edit', adminController.getShowEditPage);
router.post('/show/:itemId/', adminController.postEditedShow);
router.post('/show/:itemId/delete', adminController.postDeleteShow);


module.exports = router;