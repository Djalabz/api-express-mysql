const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const ejs = require('ejs');
const morgan = require('morgan');
const session = require('express-session');
const fs = require('fs');
// const expressValidator = require('express-validator');

// var session = require('express-session');
require('dotenv').config();

// On require nos routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movies');

// On crée notre application Express
const app = express();

// On utilise express validator pour checkBody notamment
// app.use(expressValidator())

// On convertit toutes nos arrivées de type json, telles que définit dans le Content-type
app.use(express.json());

// On peut gérer nos cookies avec cookie-parser
app.use(cookieParser());

// On définit les différentes options de notre session
// app.use(session({
//   secret: process.env.SECRET_SESSION,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }
// }));

// On établit le fichier contenant les logs
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

// On utilise morgan pour logger les requêtes
app.use(morgan('combined', { stream: accessLogStream }));

// On définit le moteur de template EJS pour les vues
app.set('view engine', 'ejs');

// On définit le dossier contenant les vues
app.set('views', path.join(__dirname, 'views'));

// On récupère les fichiers statiques (images, scripts) dans le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Options des Control Origin Request Sharing ou CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

// On utilise CORS avec nos options définies plus haut
app.use(cors(corsOptions));


//////// ROUTES ////////
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/movies', moviesRouter);


// On lance le serveur sur le port 3000
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

