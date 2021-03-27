const express = require('express')
const app = express()
const config = require('./config/config')
const {register, login} = require('./services/authService');
const {addMovieToLibrary, getUsersMovies, removeFromLibrary} = require('./services/movieService')
const authenticated = require('./middlewares/auth')
const isAuth = require('./middlewares/isAuth')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const {SECRET, COOKIE_NAME} = require('./config/config');
const cookieParser = require('cookie-parser');

const path = require('path')
app.use(express.static('build'))

app.use(cors({credentials: true}))
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(authenticated())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/getUser', (req, res) => {
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

            jwt.verify(token, SECRET, (err, user) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    res.status(200).cookie(COOKIE_NAME, token, {secure: true, httpOnly: true}).json({user, token})
                }
            })
        }).catch((error) => res.json(error))
});

app.post('/login', (req, res) => {
    login(req.body)
        .then(token => {
            jwt.verify(token, SECRET, (err, user) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    res.status(200).cookie(COOKIE_NAME, token, {sameSite: 'none', secure: true}).json({user, token})
                }
            })
        }).catch((error) => res.json(error))
});

app.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME)
    res.status(200).json({message: 'successfully'})
});

app.post('/addMovieToLibrary', isAuth, (req, res) => {
    addMovieToLibrary(req.body)
        .then(() => res.status(200).json({message: 'Successfully added to library'}))
        .catch(err => {
            console.log(err)
            return res.json({message: 'Something went wrong'})
        })
})

app.get('/getUserMovies', isAuth, (req, res) => {
    const user = req.user

    if (user) {
        getUsersMovies(user._id)
            .then(movies => res.status(200).json(movies))
            .catch(err => {
                console.log(err)
                return res.json({message: 'Something went wrong'})
            })
    } else {
        res.clearCookie(COOKIE_NAME)
    }

})

app.delete('/removeFromLibrary/:movieId/:userId', isAuth, (req, res) => {
    const movieId = req.params.movieId
    const userId = req.params.userId

    removeFromLibrary(movieId, userId)
        .then(() => res.status(200).json({message: 'Successfully removed from library'}))
        .catch(err => {
            console.log(err)
            return res.json({message: 'Something went wrong'})
        })
})

require('./config/mongoose')()
app.listen(config.PORT, () => console.log(`Server is listening on http://localhost:${config.PORT}`))
