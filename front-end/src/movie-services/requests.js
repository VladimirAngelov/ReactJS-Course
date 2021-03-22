const API_KEY = '16532dc7c21d82cfd12dc3f9cda7aaa8'
const baseURL = `https://api.themoviedb.org/3/`

//credits movieID
//  movie/791373/credits?api_key=16532dc7c21d82cfd12dc3f9cda7aaa8

const requests = {
    featured: `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
    // 'netflix-originals': `discover/tv?api_key=${API_KEY}&with_networks=213`,
    fantasy: `discover/movie?api_key=${API_KEY}&with_genres=14`,
    adventure: `discover/movie?api_key=${API_KEY}&with_genres=12`,
    thriller: `discover/movie?api_key=${API_KEY}&with_genres=53`,
    crime: `discover/movie?api_key=${API_KEY}&with_genres=80`,
    mystery: `discover/movie?api_key=${API_KEY}&with_genres=9648`,
    animations: `discover/movie?api_key=${API_KEY}&with_genres=16`,
    drama: `discover/movie?api_key=${API_KEY}&with_genres=18`,
    'top-rated': `movie/top_rated?api_key=${API_KEY}`,
    action: `discover/movie?api_key=${API_KEY}&with_genres=28`,
    comedy: `discover/movie?api_key=${API_KEY}&with_genres=35`,
    horror: `discover/movie?api_key=${API_KEY}&with_genres=27`,
    romance: `discover/movie?api_key=${API_KEY}&with_genres=10749`,
    documentariesMovies: `discover/movie?api_key=${API_KEY}&with_genres=99`,
    // 'tv-shows': `tv/popular?api_key=${API_KEY}&language=en-US`
}
// tv/popular?api_key=<16532dc7c21d82cfd12dc3f9cda7aaa8&language=en-US&page=1
export const getMovies = (type, pageNumber) => {
    return fetch(`${baseURL}${requests[type]}&page=${pageNumber}`)
        .then(res => res.json())
        .then(data => data.results)
}

// export const getMoviesByCategory = (type) => {
//     return fetch(`${baseURL}${requests[type]}`)
//         .then(res => res.json())
//         .then(data => data.results)
// }
// https://api.themoviedb.org/3/movie/587807?api_key=16532dc7c21d82cfd12dc3f9cda7aaa8&language=en-US
export const getOneMovie = (movieId) => {
    return fetch(`${baseURL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(res => res.json())
        .then(data => data)
}
// https://api.themoviedb.org/3/tv/63174?api_key=16532dc7c21d82cfd12dc3f9cda7aaa8&language=en-US
// export const getOneTvShow = (tvShowId) => {
//     return fetch(`${baseURL}tv/${tvShowId}?api_key=${API_KEY}&language=en-US`)
//         .then(res => res.json())
//         .then(data => data)
// }

export const searchMovie = (movieName) => {
    while(movieName.indexOf(' ') > -1) {
        movieName = movieName.replace(' ', '%20')
    }

    return fetch(`${baseURL}search/movie?api_key=${API_KEY}&query=${movieName}`)
        .then(res => res.json())
}

export const getMovieCredits = (movieId) => {
    return fetch(`${baseURL}movie/${movieId}/credits?api_key=${API_KEY}`)
        .then(res => res.json())
}