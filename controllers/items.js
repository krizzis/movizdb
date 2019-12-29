const Movie = require('../models/movie');
const Show = require('../models/show');
const Favorite = require('../models/fav');
const User = require('../models/user');

exports.getHomePage = (req, res, next) => {
  const itemCount = 6;
  const user = req.session.user ? req.session.user : null
  Promise.all([
    Movie.findAll({
      limit: itemCount,
      order: [['createdAt', 'DESC']],
      include: [{
        model: Favorite,
        where: { userId: user ? user.id : null },
        required: false
      }]
    }),
    Show.findAll({
      limit: itemCount,
      order: [['createdAt', 'DESC']],
      include: [{
        model: Favorite,
        where: { userId: user ? user.id : null },
        required: false
      }]
    })
  ])
    .then(items => {
      res.render('home', {
        "pageTitle": "Main page",
        "menu": "home",
        "movies": items[0],
        "shows": items[1],
        "user": user
      })
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getFavorite = (req, res, next) => {
  const user = req.session.user
  User.findByPk(user.id)
  .then(user => {
  Promise.all([
    user.getFavorite()
      .then(favorite => {
        return favorite.getMovies({
          include: [{
            model: Favorite,
            where: { userId: user.id },
            required: false
          }]
        })
      }),
    user.getFavorite()
      .then(favorite => {
        return favorite.getShows({
          include: [{
            model: Favorite,
            where: { userId: user.id },
            required: false
          }]
        })
      })
  ])
    .then(items => {
      res.render('home', {
        pageTitle: "Favorites",
        "menu": "favorite",
        "movies": items[0],
        "shows": items[1],
        "user": user
      })
    })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getAbout = (req, res, next) => {
  res.render('about', {
    "pageTitle": "About",
  })
}