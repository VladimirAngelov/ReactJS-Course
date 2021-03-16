const express = require('express')
const app = express()
const config = require('./config/config')
const {register, login} = require('./services/authService');
const {addMovieToLibrary, getUsersMovies, removeFromLibrary} = require('./services/movieService')

const User = require('./Models/User');
const jwt = require('jsonwebtoken');
const {SECRET, COOKIE_NAME} = require('./config/config');
const cookieParser = require('cookie-parser');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use((req, res, next) => {
    const token = req.cookies['user_session'] || req.headers['user_session'];
    next()
})

app.get('/getUser', (req, res, next) => {
    let token = req.cookies[COOKIE_NAME];
    console.log('getUSER')
    jwt.verify(token , SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie(COOKIE_NAME)
            res.json({message: 'No user found'})
        } else {
            req.user = decoded;
            res.json(decoded);
        }
    })
})

app.get('/api', (req, res) => {
    res.json({type: 'success'})
})

app.post('/register', (req, res) => {
    register(req.body)
        .then(token => {
            res.cookie(COOKIE_NAME, token, {httpOnly: true});
            res.status(200).json(token)
        }).catch((error) => res.json(error))
});

app.post('/login', (req, res) => {
    login(req.body)
        .then(token => {
            res.cookie(COOKIE_NAME, token, {httpOnly: true});
            res.status(200).json(token)
        }).catch((error) => res.json(error))
});

app.get('/logout', (req, res) => {
        res.clearCookie(COOKIE_NAME)
        res.status(200).json({message: 'successfully'})
});

app.post('/addMovieToLibrary', (req, res) => {
    addMovieToLibrary(req.body)
        .then(() => res.status(200).json({message: 'Successfully added to library'}))
})

app.get('/getUserMovies', (req, res) => {
    let token = req.cookies[COOKIE_NAME];

    jwt.verify(token , SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie(COOKIE_NAME)
        } else {
            getUsersMovies(decoded._id)
                .then(movies => res.status(200).json(movies))
        }
    })
})

app.delete('/removeFromLibrary/:movieId/:userId', (req, res) => {
    const movieId = req.params.movieId
    const userId = req.params.userId

    removeFromLibrary(movieId, userId)
        .then(() => res.status(200).json({message: 'Successfully removed from library'}))
})

require('./config/mongoose')()
app.listen(config.PORT, () => console.log(`Server is listening on http://localhost:${config.PORT}`))