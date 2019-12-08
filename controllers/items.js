const Item = require('../models/item');
const Movie = require('../models/movie');
const Show = require('../models/show');

const admin = 1;

exports.getAdminPage = (req, res, next) => {
    res.render('./admin/dashboard', {
      "pageTitle": "Admin page",
      "menu": "admin"
    });
};

exports.getItemDetailsPage = (req, res, next) => {
  const itemId = req.params.itemId;
  Item.findById(itemId, item => {
    res.render('./layouts/item-details', {
      "pageTitle": item.title,
      "menu": item.type,
      "title": item.title,
      "item": item
  })
  })
};


exports.getMovieEditPage = (req, res, next) => {
  res.render('./admin/dashboard', {
    "pageTitle": "Edit Movie",
    "menu": "admin"
  });
};

exports.postNewItem = (req, res, next) => {
    if (req.body.type === 'mov') {
      const item = new Movie(req.body.title, req.body.poster);
      item.save();
    }
    else {
      const item = new Show(req.body.title, req.body.poster);
      item.save();
    }
    res.redirect('/');
  };

  exports.getHomePage = (req, res, next) => {
    const itemCount = 6;
    Item.fetch((movies) => {
          Item.fetch((shows) => {
            res.render('home', {
              "pageTitle": "Main page",
              "menu": "home",
              "movies": movies,
              "shows": shows,
              "isAdmin": admin
          });
          }, itemCount)
        }, itemCount);
  }

  exports.getMoviesPage = (req, res, next) => {
    Movie.fetch((movies) => {
            res.render('movies/movies', {
              "pageTitle": "Movies",
              "menu": "movies",
              "movies": movies,
              "isAdmin": admin
          });
        })
      };

  exports.getMovieEditPage = (req, res, next) => {
    res.render('./admin/dashboard', {
      "pageTitle": "Edit Movie",
      "menu": "admin"
    });
  };

  exports.getShowsPage = (req, res, next) => {
    Item.fetch((shows) => {
            res.render('shows/shows', {
              "pageTitle": "Shows",
              "menu": "shows",
              "shows": shows,
              "isAdmin": admin
          });
        })
      };      

  exports.getPersonsPage = (req, res, next) => {
    res.render('stubs/wip', {
      "pageTitle": "People",
      "menu": "persons"
    });
};
