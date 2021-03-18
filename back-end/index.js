const express = require('express')
const app = express()
const config = require('./config/config')
const {register, login} = require('./services/authService');
const {addMovieToLibrary, getUsersMovies, removeFromLibrary} = require('./services/movieService')
const authenticated = require('./middlewares/auth')
const isAuth = require('./middlewares/isAuth')

const jwt = require('jsonwebtoken');
const {SECRET, COOKIE_NAME} = require('./config/config');
const cookieParser = require('cookie-parser');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(authenticated())

app.get('/getUser', isAuth, (req, res) => {
    const user = req.user

    if (user) {
        res.json(user)
    } else {
        res.json({message: 'No user found'})
    }
})

app.post('/register', (req, res) => {
    register(req.body)
        .then(token => {
            res.cookie(COOKIE_NAME, token, {httpOnly: true});

            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    res.status(200).json(decoded)
                }
            })

        }).catch((error) => res.json(error))
});

app.post('/login', (req, res) => {
    login(req.body)
        .then(token => {
            res.cookie(COOKIE_NAME, token, {httpOnly: true});

            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    res.status(200).json(decoded)
                }
            })

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

app.get('/getUserMovies', isAuth, (req, res) => {
    const user = req.user

    if (user) {
        getUsersMovies(user._id)
            .then(movies => res.status(200).json(movies))
    } else {
        res.clearCookie(COOKIE_NAME)
    }

})

app.delete('/removeFromLibrary/:movieId/:userId', (req, res) => {
    const movieId = req.params.movieId
    const userId = req.params.userId

    removeFromLibrary(movieId, userId)
        .then(() => res.status(200).json({message: 'Successfully removed from library'}))
        .catch(err => {
            console.log(err)
            return res.status(200).json({message: 'Something went wrong'})
        })
})

require('./config/mongoose')()
app.listen(config.PORT, () => console.log(`Server is listening on http://localhost:${config.PORT}`))