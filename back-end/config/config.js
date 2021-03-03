const config = {
    PORT: process.env.NODE_ENV || 5000,
    dbURI: 'mongodb+srv://admin:admin@themovies.huxkn.mongodb.net/themovies?retryWrites=true&w=majority',
    COOKIE_NAME: 'user_session',
    SECRET: 'superSecret'
}

module.exports = config