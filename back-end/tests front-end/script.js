// const API_KEY = '16532dc7c21d82cfd12dc3f9cda7aaa8'
// const baseURL = `https://api.themoviedb.org/3/`
// const imageUrl = `http://image.tmdb.org/t/p/w400`
// // The base URL will look like: http://image.tmdb.org/t/p/ then you'll need a size let's say w185 then the poster path you got,
// // so this is the final url http://image.tmdb.org/t/p/w185/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg
//
// const requests = {
//     popularMovies: `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
//     netflixMovies: `discover/tv?api_key=${API_KEY}&with_networks=213`,
//     dramaMovies: `discover/movie?api_key=${API_KEY}&with_genres=18`,
//     topRatedMovies: `movie/top_rated?api_key=${API_KEY}&language=en-US`,
//     actionMovies: `discover/movie?api_key=${API_KEY}&with_genres=28`,
//     comedyMovies: `discover/movie?api_key=${API_KEY}&with_genres=35`,
//     horrorMovies: `discover/movie?api_key=${API_KEY}&with_genres=27`,
//     romanceMovies: `discover/movie?api_key=${API_KEY}&with_genres=10749`,
//     documentariesMovies: `discover/movie?api_key=${API_KEY}&with_genres=99`,
// }
//
// document.getElementById('test')
//     .addEventListener('click', () => {
//         fetch(`${baseURL}${requests.netflixMovies}`)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//                 document.getElementById('image').src = `${imageUrl}${data.results[0].poster_path}`
//             })
//     })
//
// document.getElementById('test1')
//     .addEventListener('click', () => {
//         fetch(`http://localhost:5000/api/`)
//             .then(res => res.json())
//             .then(data => console.log(data))
//     })
//
// document.getElementById('test2')
//     .addEventListener('click', () => {
//
//         fetch(`http://localhost:5000/api/`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({type: 'post request'})
//         }).then(res => console.log(res))
//
//     })