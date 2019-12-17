const Movie = require('../models/movie');
const Show = require('../models/show');
const Genre = require('../models/genre');

const superagent = require('superagent');

// exports.getAdminPage = (req, res, next) => {
//     res.render('./admin/dashboard', {
//       "pageTitle": "Admin page",
//       "menu": "admin"
//     });
// };

exports.getAdminPage = (req, res, next) => {
  res.render('./admin/getmovie', {
    "pageTitle": "Admin page",
    "menu": "admin"
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

exports.postNewItem = (req, res, next) => {
  const apiKey = '7b3e52648db3d7870c421ac2f639f6a3';
  

  superagent.get('https://api.themoviedb.org/3/movie/' + req.body.id)
    .query({ api_key: apiKey})
    .end((err, res) => {
      if (err) { return console.log(err); }

      const arr = res.body.genres;

      Genre.bulkCreate(arr,
        {
          updateOnDuplicate:["name"]
         })
      .then(

      Movie.findByPk(res.body.id).then(movie=> {
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
            rating: res.body.vote_average*10
          })
        }
      })
      .then((movie) => 
        {
          console.log(movie.title);
          res.body.genres.forEach(genre => {
            movie.addGenre(genre.id)
          })
        }
      )
      .catch(err=>{
        console.log(err
      )})
      );
});

  res.redirect('/admin');
}

exports.getMovieEditPage = (req, res, next) => {
  const id = req.params.itemId;
  Movie.findByPk(id)
    .then(item => {
      console.log(item);
      console.log(item.id);
      item.type="movies";
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
      item.type="shows";
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

exports.postDeleteMovie = (req, res, next) =>{
  const itemId = req.params.itemId;
  Movie.destroy({where: {id: itemId}});
  res.redirect('/');
}

exports.postDeleteShow = (req, res, next) =>{
  const itemId = req.params.itemId;
  Show.destroy({where: {id: itemId}});
  res.redirect('/');
}
