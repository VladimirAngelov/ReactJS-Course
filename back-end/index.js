const express = require('express')
const app = express()
const config = require('./config/config')
const {register, login} = require('./services/authService');
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

app.get('/api', (req, res) => {
    res.json({type: 'success'})
})

app.post('/register', (req, res) => {
    register(req.body)
        .then(token => {
            res.cookie(COOKIE_NAME, token, {httpOnly: true});
            res.status(200).json({ok: true})
        }).catch((error) => res.json(error))
});

app.post('/login', (req, res) => {
    console.log(req.body)
    login(req.body)
        .then(token => {
            res.cookie(COOKIE_NAME, token, {httpOnly: true});
            res.status(200).json({ok: true})
        }).catch((error) => res.json(error))
});

require('./config/mongoose')()
app.listen(config.PORT, () => console.log(`Server is listening on http://localhost:${config.PORT}`))