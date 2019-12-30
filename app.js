const express = require('express');
const sequelize = require('./data/database');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);

const Movie = require('./models/movie');
const Show = require('./models/show');
const User = require('./models/user');
const Favorite = require('./models/fav');
const FavoriteMovie = require('./models/fav-movie');
const FavoriteShow = require('./models/fav-show');
const Genre = require('./models/genre');
const MovieGenre = require('./models/movie-genre');
const ShowGenre = require('./models/show-genre');
const Person = require('./models/person');
const Cast = require('./models/cast');

const app = express();
const sessionStore = new SessionStore({
    db: sequelize
});

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'ee3d2f54-4427-4740-914e-9d65c54fde42', 
    store: sessionStore,
    resave: false, 
    saveUninitialized: false
}));

const adminRouter = require('./routes/admin');
const itemsRouter = require('./routes/items');
const loginRouter = require('./routes/auth');

const errorController = require('./controllers/errors');

app.use(cookieParser());

app.use('/admin', adminRouter);
app.use('/auth', loginRouter)
app.use(itemsRouter);
app.use(errorController.getNotFoundPage);



Movie.belongsTo(User, { foreignKey: { allowNull: true } });
Show.belongsTo(User, { foreignKey: { allowNull: true } });
User.hasOne(Favorite);
Favorite.belongsToMany(Movie, { through: FavoriteMovie });
Movie.belongsToMany(Favorite, { through: FavoriteMovie });
Favorite.belongsToMany(Show, { through: FavoriteShow });
Show.belongsToMany(Favorite, { through: FavoriteShow });
Movie.belongsToMany(Genre, { through: MovieGenre });
Show.belongsToMany(Genre, { through: ShowGenre });
Show.belongsToMany(Person, { through: { model: Cast, unique: false } });
Movie.belongsToMany(Person, { through: { model: Cast, unique: false } });
Person.belongsToMany(Show, { through: { model: Cast, unique: false } });
Person.belongsToMany(Movie, { through: { model: Cast, unique: false } });



sequelize
    .sync(
        // {force: true}
    )
    .then(() => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    })
