const config = {
    PORT: process.env.PORT || 5000,
    dbURI: 'mongodb://127.0.0.1:27017/the-trailers',
    COOKIE_NAME: 'user_session',
    SECRET: 'superSecret',
    SALT_ROUNDS: 10
}

module.exports = config