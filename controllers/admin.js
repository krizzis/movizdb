const Movie = require('../models/movie');
const Show = require('../models/show');
const Genre = require('../models/genre');
const Person = require('../models/person');

const superagent = require('superagent');

const apiKey = '7b3e52648db3d7870c421ac2f639f6a3';

// exports.getAdminPage = (req, res, next) => {
//     res.render('./admin/dashboard', {
//       "pageTitle": "Admin page",
//       "menu": "admin"
//     });
// };

exports.getAdminPage = (req, res, next) => {
  const admin = req.session.isAdmin;
  res.render('./admin/getmovie', {
    "pageTitle": "Admin page",
    "menu": "admin",
    "isAdmin": admin
  });
};

// exports.postNewItem = (req, res, next) => {
//   if (req.body.type === 'movies') {
//     console.log("User: " + req.user);
//     req.user.createMovie({ title: req.body.title, imageUrl: req.body.poster })
//     .then(res.redirect('/')).catch(err => {
//       console.log(err);
//     });
//   }
//   if (req.body.type === 'shows') {
//       req.user.createShow({ title: req.body.title, imageUrl: req.body.poster })
//       .then(res.redirect('/')).catch(err => {
//         console.log(err);
//       });
//   };
// };

exports.postNewMovieApi = (req, res, next) => {
  superagent.get('https://api.themoviedb.org/3/movie/' + req.body.id)
    .query({ api_key: apiKey })
    .end((err, res) => {
      if (err) { return console.log(err); }
      const arr = res.body.genres;
      Genre.bulkCreate(arr,
        {
          updateOnDuplicate: ["name"]
        })
        .then(

          Movie.findByPk(res.body.id).then(movie => {
            if (movie) {
              return movie
            }
            else {
              return Movie.create({
                id: res.body.id,
                title: res.body.title,
                imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + res.body.poster_path,
                status: res.body.status,
                release_date: res.body.release_date,
                language: res.body.original_language,
                duration: res.body.runtime,
                budget: res.body.budget,
                revenue: res.body.revenue,
                slogan: res.body.tagline,
                description: res.body.overview,
                rating: res.body.vote_average * 10
              })
            }
          })
            .then((movie) => {
              res.body.genres.forEach(genre => {
                movie.addGenre(genre.id)
              })
              return movie
            }
            )
            .then(
              getCreditsMovie(res.body.id)
            )
            .catch(err => {
              console.log(err
              )
            })
        );
    });

  res.redirect('/admin');
}

exports.postNewShowApi = (req, res, next) => {
  superagent.get('https://api.themoviedb.org/3/tv/' + req.body.id)
    .query({ api_key: apiKey })
    .end((err, res) => {
      if (err) { return console.log(err); }

      const arr = res.body.genres;

      Genre.bulkCreate(arr,
        {
          updateOnDuplicate: ["name"]
        })
        .then(

          Show.findByPk(res.body.id).then(show => {
            if (show) {
              return show
            }
            else {
              return Show.create({
                id: res.body.id,
                title: res.body.name,
                imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + res.body.poster_path,
                status: res.body.status,
                year_started: res.body.first_air_date.substr(0, 4),
                year_finished: res.body.last_air_date.substr(0, 4),
                seasons: res.body.number_of_seasons,
                episodes: res.body.number_of_episodes,
                language: res.body.original_language,
                runtime: res.body.episode_run_time,
                description: res.body.overview,
                rating: res.body.vote_average * 10
              })
            }
          })
            .then((show) => {
              res.body.genres.forEach(genre => {
                show.addGenre(genre.id)
              })
            }
            )
            .then(
              getCreditsShow(res.body.id)
            )
            .catch(err => {
              console.log(err
              )
            })
        );
    });

  res.redirect('/admin');
};

exports.getMovieEditPage = (req, res, next) => {
  const id = req.params.itemId;
  Movie.findByPk(id)
    .then(item => {
      item.type = "movies";
      res.render('./admin/edit-item', {
        "pageTitle": item.title,
        "imageUrl": item.imageUrl,
        "menu": "movies",
        "title": item.title,
        "item": item
      });
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getShowEditPage = (req, res, next) => {
  const id = req.params.itemId;
  Show.findByPk(id)
    .then(item => {
      item.type = "shows";
      res.render('./admin/edit-item', {
        "pageTitle": item.title,
        "imageUrl": item.imageUrl,
        "menu": "shows",
        "title": item.title,
        "item": item
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditedMovie = (req, res, next) => {
  const Id = req.params.itemId;
  Movie.findByPk(Id).then(movie => {
    movie.title = req.body.title;
    movie.imageUrl = req.body.imageUrl;
    return movie.save();
  })
    .then(res.redirect('/'))
    .catch(err => {
      console.log(err);
    })
};

exports.postEditedShow = (req, res, next) => {
  const Id = req.params.itemId;
  Show.findByPk(Id).then(show => {
    show.title = req.body.title;
    show.imageUrl = req.body.imageUrl;
    return show.save();
  })
    .then(res.redirect('/'))
    .catch(err => {
      console.log(err);
    })
};

exports.postDeleteMovie = (req, res, next) => {
  const itemId = req.params.itemId;
  Movie.destroy({ where: { id: itemId } });
  res.redirect('/');
}

exports.postDeleteShow = (req, res, next) => {
  const itemId = req.params.itemId;
  Show.destroy({ where: { id: itemId } });
  res.redirect('/');
}

function getCreditsMovie(id) {
  superagent.get('https://api.themoviedb.org/3/movie/' + id + '/credits')
    .query({ api_key: apiKey })
    .end((err, res) => {
      cast = limitCast(res.body);
      cast.forEach(p => {
        p.cast_index = cast.indexOf(p);
        superagent.get('https://api.themoviedb.org/3/person/' + p.id)
          .query({ api_key: apiKey })
          .end((err, res) => {
            Person.findOrCreate({
              where: { id: p.id },
              defaults: {
                id: p.id,
                fullname: res.body.name,
                imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + p.profile_path,
                gender: p.gender === 2 ? "Male" : "Female",
                birthday: res.body.birthday,
                birthplace: res.body.place_of_birth,
                deathday: res.body.deathday,
                description: res.body.biography,
                role: res.body.known_for_department,
                homepage: res.body.homepage
              }
            })
              .then(
                Movie.findByPk(id).then(movie => {
                  return movie.addPerson(p.id, { through: { job: p.job, character: p.character, cast_id: p.cast_index } });
                })
              )
          })
      })
    })
};

function getCreditsShow(id) {
  superagent.get('https://api.themoviedb.org/3/tv/' + id + '/credits')
    .query({ api_key: apiKey })
    .end((err, res) => {
      cast = limitCast(res.body);
      cast.forEach(p => {
        p.cast_index = cast.indexOf(p);
        superagent.get('https://api.themoviedb.org/3/person/' + p.id)
          .query({ api_key: apiKey })
          .end((err, res) => {
            Person.findOrCreate({
              where: { id: p.id },
              defaults: {
                id: p.id,
                fullname: res.body.name,
                imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + p.profile_path,
                gender: p.gender === 2 ? "Male" : "Female",
                birthday: res.body.birthday,
                birthplace: res.body.place_of_birth,
                deathday: res.body.deathday,
                description: res.body.biography,
                role: res.body.known_for_department,
                homepage: res.body.homepage
              }
            })
              .then(
                Show.findByPk(id).then(show => {
                  return show.addPerson(p.id, { through: { job: p.job, character: p.character, cast_id: p.cast_index } });
                })
              )
          })
      })
    })
};

function limitCast(body) {
  let res = [];
  let dir = body.crew.find(c => c.job === 'Director');
  if (dir) {
    res.push(dir)
  }
  let arr = body.cast.slice(0, dir ? 5 : 6);
  arr.forEach(i => {
    res.push(i);
  })
  return res;
}
