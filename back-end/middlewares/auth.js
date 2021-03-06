const jwt = require('jsonwebtoken');
const {COOKIE_NAME, SECRET} = require('../config/config')

const authenticated = () => {
    return (req, res, next) => {
        let token = req.cookies[COOKIE_NAME];

        if (token) {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    req.user = decoded;
                    req.user.isAuthenticated = true;
                }
            })
        }
        next();
    }
}

module.exports = authenticated;