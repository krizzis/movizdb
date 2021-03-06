const Show = require('../models/show');
const Favorite = require('../models/fav');
const User = require('../models/user');

exports.getShowsPage = (req, res, next) => {
  const user = req.session.user ? req.session.user : null
  Show.findAll({
    include: [{
      model: Favorite,
      where: { userId: user ? user.id : null },
      required: false
    }]
  })
    .then(shows => {
      res.render('shows/shows', {
        "pageTitle": "Shows",
        "menu": "shows",
        "shows": shows,
        "user": user
      });
    }).catch(err => {
      console.log(err);
    });
};

exports.getShowDetailsPage = (req, res, next) => {
  const user = req.session.user ? req.session.user : null
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
          castList =
            show.getPeople()
              .then(people => {
                show.cast = []
                people.forEach(i => {
                  show.cast.push({ id: i.id, cast_id: i.cast.cast_id, name: i.fullname, photo: i.imageUrl, position: i.cast.job ? i.cast.job : i.cast.character })
                })
                show.cast.sort((a, b) => a.cast_id - b.cast_id);
                return show
              })
              .then(show => {
                item.title = show.title;
                item.imageUrl = show.imageUrl;
                item.description = show.description;
                item.rating = show.rating,
                  item.genres = show.genres
                item.summary = [
                  { key: "Status", value: show.status },
                  { key: "Started", value: show.year_started },
                  { key: "Finished", value: show.year_started },
                  { key: "Seasons", value: show.seasons },
                  { key: "Episodes", value: show.episodes },
                  { key: "Original language", value: show.language },
                  { key: "Runtime", value: Math.floor(show.duration / 60) + "h " + show.duration % 60 + "m" },
                ],
                  item.cast = show.cast
                res.render('./layouts/item-details', {
                  "pageTitle": item.title,
                  "menu": "shows",
                  "title": item.title,
                  "item": item,
                  "user": user
                });
              })
              .catch(err => {
                console.log(err);
              });
        });
    });
};

exports.postFavoriteShow = (req, res, next) => {
  const user = req.session.user ? req.session.user : null
  const itemId = req.params.itemId;
  let fetchedFavorites;
  User.findByPk(user.id)
    .then(user => {
      user.getFavorite()
        .then(favorite => {
          fetchedFavorites = favorite;
          return favorite.getShows({ where: { id: itemId } });
        })
        .then(items => {
          let item;
          if (items.length > 0) {
            item = items[0];
          }
          if (item) {
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