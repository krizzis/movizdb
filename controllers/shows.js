const Show = require('../models/show');
const Favorite = require('../models/fav');

const admin = 0;

  exports.getShowsPage = (req, res, next) => {
    Show.findAll({ include: [ {
      model: Favorite,
      where: {userId: req.user.id},
      required:false
} ] }).then(shows => {
      res.render('shows/shows', {
        "pageTitle": "Shows",
        "menu": "shows",
        "shows": shows,
        "isAdmin": admin
      });
    }).catch(err=>{
      console.log(err);
    });
  };

  exports.getShowDetailsPage = (req, res, next) => {
    const id = req.params.itemId;
    let item = {};
    Show.findByPk(id)
      .then(show => {
        show.getGenres().then(genres => {
          show.genres = []
          for (const i of genres) {
            show.genres.push(i.name);
          }
          return show
        })
        .then(show => {
          item.title = show.title;
          item.imageUrl = show.imageUrl;
          item.description = show.description;
          item.rating = show.rating,
          item.genres = show.genres
          item.summary = [
            {key: "Status", value: show.status},
            {key: "Started", value: show.year_started},
            {key: "Finished", value: show.year_started},
            {key: "Seasons", value: show.seasons},
            {key: "Episodes", value: show.episodes},
            {key: "Original language", value: show.language},
            {key: "Runtime", value: Math.floor(show.duration/60) + "h " + show.duration%60 + "m"},
          ]
          res.render('./layouts/item-details', {
            "pageTitle": item.title,
            "menu": "shows",
            "title": item.title,
            "item": item
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  exports.postFavoriteShow = (req, res, next) => {
    const itemId = req.params.itemId;
    let fetchedFavorites;
    req.user.getFavorite()
      .then(favorite =>{
        fetchedFavorites = favorite;
        return favorite.getShows({where: {id: itemId}});
      })
      .then(items => {
        let item;
        if (items.length > 0) {
          item = items[0];
        }
        if (item){
          return item.favoriteShow.destroy();
        }
        return Show.findByPk(itemId)
          .then(item => {
            return fetchedFavorites.addShow(item);
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