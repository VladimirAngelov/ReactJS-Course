const config = {
    PORT: process.env.NODE_ENV || 5000,
    // dbURI: 'mongodb+srv://admin:admin@themovies.huxkn.mongodb.net/themovies?retryWrites=true&w=majority',
    dbURI: 'mongodb://127.0.0.1:27017/the-movies',
    COOKIE_NAME: 'user_session',
    SECRET: 'superSecret',
    SALT_ROUNDS: 10
}

module.exports = config