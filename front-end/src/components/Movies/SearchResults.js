import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import style from './SearchResults.module.css'
import Navbar from "../Navbar";
import {searchMovie} from "../../movie-services/requests";
import Loader from "../Loader";

const imageUrl = `http://image.tmdb.org/t/p/w400`

const SearchResults = (props) => {
    const [results, setResults] = useState([])
    const search = props.location.state.search
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        searchMovie(search.trim())
            .then(movies => {
                setResults(movies.results)
                setIsLoading(false)
            })
    }, [search])

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    let movieData = results
        .filter(x => x.poster_path !== null)
        .map(movie => {
                return (
                    <span className={style['searched-pictures']} key={movie.id}>
                <Link to={'/movie/details/' + movie.id}>
                    <img className="home-images" src={imageUrl + movie.poster_path}
                         width={120} height={170} alt={movie.title}/>
                </Link>
                </span>
                )
            }
        )

    return (
        <>
            <Navbar/>
            <h4 className="home-title">
                {movieData.length > 1 ? `${movieData.length} Results` : `${movieData.length} Result`} for "{search}"
            </h4>
            <div className={style.pictures}>
                {movieData}
            </div>
        </>
    )
}

export default SearchResults