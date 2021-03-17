const User = require('../Models/User');

module.exports = {
    addMovieToLibrary: async ({userId, movie}) => {
        let user = await User.findById(userId);

        user.movieLibrary?.push(movie)

        return user.save()
    },
    getUsersMovies: async (userId) => {
        const user = await User.findById(userId)

        return user.movieLibrary
    },
    removeFromLibrary: async (movieId, userId) => {
        const user = await User.findById(userId)

        const findMovie = user.movieLibrary.find(m => m.id.toString() === movieId)

        const index = user.movieLibrary.indexOf(findMovie)

        user.movieLibrary.splice(index, 1)

        return user.save()
    }
}