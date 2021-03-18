import {useState, useEffect} from 'react';
import {getOneMovie,
    // getOneTvShow
} from "../../../movie-services/requests";
import Movie from './Movie'

const Details = () => {
    const [movie, setMovie] = useState({})
    const movieId = window.location.pathname.match(/\d+/)[0]

    // const contentType = window.location.pathname.split('/')[1]

    useEffect(() => {
        // if (contentType === 'movie') {
            getOneMovie(movieId)
                .then(res => setMovie(res))
                .catch(err => console.log(err))
        // }
        // else {
        //     getOneTvShow(movieId)
        //         .then(res => setMovie(res))
        //         .catch(err => console.log(err))
        // }
    }, [movieId])

    console.log(movie.overview?.length)
    const genres = movie.genres?.map(g => g.name).join(', ')
    const countries = movie.production_countries?.map(c => c.name).join(', ')
    const productionCompanies = movie.production_companies?.map(c => c.name).join(', ')

    return (
        <div className="row">
            <Movie movie={movie} genres={genres} countries={countries} productionCompanies={productionCompanies}/>
        </div>
    )
}

export default Details