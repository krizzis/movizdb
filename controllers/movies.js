const Movie = require('../models/movie');
const Favorite = require('../models/fav');
const User = require('../models/user');

exports.getMoviesPage = (req, res, next) => {
  const user = req.session.user ? req.session.user : null
  Movie.findAll({
    include: [{
      model: Favorite,
      where: { userId: user ? user.id : null },
      required: false
    }]
  })
    .then(movies => {
      res.render('movies/movies', {
        "pageTitle": "Movies",
        "menu": "movies",
        "movies": movies,
        "user": user
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getMovieDetailsPage = (req, res, next) => {
  const user = req.session.user ? req.session.user : null
  const id = req.params.itemId;
  let item = {};
  Movie.findByPk(id)
    .then(movie => {
      movie.getGenres().then(genres => {
        movie.genres = []
        for (const i of genres) {
          movie.genres.push(i.name);
        }
        return movie
      })
        .then(movie => {
          castList =
            movie.getPeople()
              .then(people => {
                movie.cast = []
                people.forEach(i => {
                  movie.cast.push({ id: i.id, cast_id: i.cast.cast_id, name: i.fullname, photo: i.imageUrl, position: i.cast.job ? i.cast.job : i.cast.character })
                })
                movie.cast.sort((a, b) => a.cast_id - b.cast_id);
                return movie
              })
              .then(movie => {
                item.title = movie.title;
                item.slogan = movie.slogan;
                item.imageUrl = movie.imageUrl;
                item.description = movie.description;
                item.rating = movie.rating,
                  item.genres = movie.genres
                item.summary = [
                  { key: "Status", value: movie.status },
                  { key: "Release Date", value: movie.release_date },
                  { key: "Original language", value: movie.language },
                  { key: "Duration", value: Math.floor(movie.duration / 60) + "h " + movie.duration % 60 + "m" },
                  { key: "Budget", value: movie.budget ? "$ " + movie.budget.toLocaleString() : null },
                  { key: "Revenue", value: movie.budget ? "$ " + movie.revenue.toLocaleString() : null }
                ],
                  item.cast = movie.cast
                res.render('./layouts/item-details', {
                  "pageTitle": item.title,
                  "menu": "movies",
                  "title": item.title,
                  "item": item,
                  "user": user
                });
              })
              .catch(err => {
                console.log(err);
              });
        })
    })
};

exports.postFavoriteMovie = (req, res, next) => {
  const user = req.session.user ? req.session.user : null
  const itemId = req.params.itemId;
  let fetchedFavorites;
  User.findByPk(user.id)
    .then(user => {
      user.getFavorite()
        .then(favorite => {
          fetchedFavorites = favorite;
          return favorite.getMovies({ where: { id: itemId } });
        })
        .then(items => {
          let item;
          if (items.length > 0) {
            item = items[0];
          }
          if (item) {
            return item.favoriteMovie.destroy();
          }
          return Movie.findByPk(itemId)
            .then(item => {
              return fetchedFavorites.addMovie(item);
            })
            .catch(err => {
              console.log(err)
            })
        })
        .then(() => {
          res.redirect('back')
        }
        )
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err)
    })
};