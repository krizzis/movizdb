const Movie = require('../models/movie');
const Favorite = require('../models/fav');

const admin = 0;

exports.getMoviesPage = (req, res, next) => {
    Movie.findAll({ include: [ {
              model: Favorite,
              where: {userId: req.user.id},
              required:false
    } ] })
      .then(movies => {
        // console.log(JSON.stringify(movies))
        res.render('movies/movies', {
          "pageTitle": "Movies",
          "menu": "movies",
          "movies": movies,
          "isAdmin": admin
        });
    })
      .catch(err=>{
      console.log(err);
    });
  };

  exports.getMovieDetailsPage = (req, res, next) => {
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
          item.title = movie.title;
          item.imageUrl = movie.imageUrl;
          item.description = movie.description;
          item.rating = movie.rating,
          item.genres = movie.genres
          item.summary = [
            {key: "Status", value: movie.status},
            {key: "Release Date", value: movie.release_date},
            {key: "Original language", value: movie.language},
            {key: "Duration", value: Math.floor(movie.duration/60) + "h " + movie.duration%60 + "m"},
            {key: "Budget", value: movie.budget? "$ " + movie.budget.toLocaleString(): null},
            {key: "Revenue", value: movie.budget? "$ " + movie.revenue.toLocaleString(): null}
          ]
          res.render('./layouts/item-details', {
            "pageTitle": item.title,
            "menu": "movies",
            "title": item.title,
            "item": item
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  exports.postFavoriteMovie = (req, res, next) => {
    const itemId = req.params.itemId;
    let fetchedFavorites;
    req.user.getFavorite()
      .then(favorite =>{
        fetchedFavorites = favorite;
        return favorite.getMovies({where: {id: itemId}});
      })
      .then(items => {
        let item;
        if (items.length > 0) {
          item = items[0];
        }
        if (item){
          return item.favoriteItem.destroy();
        }
        return Movie.findByPk(itemId)
          .then(item => {
            return fetchedFavorites.addMovie(item);
          })
          .catch(err => {
          })
      })
      .then(() => {
        res.redirect('back')}
        )
      .catch(err => {
        console.log(err);
      });
  };