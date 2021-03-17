module.exports = (req, res, next) => {
    if (!req.user) return res.json({message: 'You should be authenticated!'})
    next()
}