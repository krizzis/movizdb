const Person = require('../models/person');

const admin = 0;

  exports.getPersonsPage = (req, res, next) => {
    Person.findAll()
    .then(persons => {
      // console.log(JSON.stringify(persons));
      res.render('persons/persons', {
        "pageTitle": "Persons",
        "menu": "persons",
        "persons": persons,
        "isAdmin": admin
      });
    }).catch(err=>{
      console.log(err);
    });
  };

  exports.getPersonDetailsPage = (req, res, next) => {
    const id = req.params.itemId;
    let item = {};
    Person.findByPk(id)
        .then(person => {
          creditList =
          person.getMovies()
            .then(movies => {
              person.cast = []
              movies.forEach(i => {
                person.cast.push({id: i.id, poster:i.imageUrl, title: i.title, type: 'movie'})
              })
              return person       
            })
            .then(person => {
              person.getShows()
                .then(shows => {
                  person.cast = person.cast ? person.cast : []
                  shows.forEach(i => {
                    person.cast.push({id: i.id, poster:i.imageUrl, title: i.title, type: 'show'})
                  })
                  return person
                })
        .then(person => {
          item.title = person.fullname;
          item.imageUrl = person.imageUrl;
          item.description = person.description;
          item.rating = person.rating,
          item.genres = [],
          item.summary = [
            {key: "Known for", value: person.role},
            {key: "Gender", value: person.gender},
            {key: "Known Credits", value: null}, //TODO
            {key: "Birthday", value: person.birthday},
            {key: "Day of Death", value: person.deathday},
            {key: "Place of Birth", value: person.birthplace},
            {key: "Official Site", value: person.homepage},
          ],
          item.cast = person.cast;          
          res.render('./layouts/person-details', {
            "pageTitle": item.title,
            "menu": "persons",
            "title": item.title,
            "item": item
          });
        })
        .catch(err => {
          console.log(err);
        });
      })
    })
  };

  // exports.postFavoriteShow = (req, res, next) => {
  //   const itemId = req.params.itemId;
  //   let fetchedFavorites;
  //   req.user.getFavorite()
  //     .then(favorite =>{
  //       fetchedFavorites = favorite;
  //       return favorite.getShows({where: {id: itemId}});
  //     })
  //     .then(items => {
  //       let item;
  //       if (items.length > 0) {
  //         item = items[0];
  //       }
  //       if (item){
  //         return item.favoriteShow.destroy();
  //       }
  //       return Show.findByPk(itemId)
  //         .then(item => {
  //           return fetchedFavorites.addShow(item);
  //         })
  //         .catch(err => {
  //         })
  //     })
  //     .then(() => {
  //       res.redirect('back')}
  //       )
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };