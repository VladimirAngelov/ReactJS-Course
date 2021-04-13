import React, {useContext, useEffect, useState} from 'react'
import {Link, Redirect, withRouter} from "react-router-dom";
import style from './SearchResults.module.css'
import {searchMovie} from "../../../movie-services/requests";
import Loader from "../../Loader/Loader";
import {Context} from "../../../Store/Store";

const imageUrl = `http://image.tmdb.org/t/p/w400`

const SearchResults = (props) => {
    const [user] = useContext(Context)
    const [results, setResults] = useState([])
    const search = props.match.params.search
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        searchMovie(search.trim())
            .then(movies => {
                setResults(movies.results)
                setIsLoading(false)
            })
    }, [search])

    if (isLoading) return <Loader/>

    if (user.username === '') return <Redirect to='/login'/>

    let movieData = results
        .filter(x => x.poster_path !== null)
        .map(movie => {
                return (
                    <span className={style['searched-pictures']} key={movie.id}>
                        <Link to={'/movie/details/' + movie.id}>
                            <img className="home-images" src={imageUrl + movie.poster_path} width={120} height={170}
                                 alt={movie.title}/>
                        </Link>
                    </span>
                )
            }
        )

    return (
        <div className={style.searchedContainer}>
            <div className={style.pictures}>
                <h4 className="home-title">
                    {movieData.length > 1 ? `${movieData.length} Results` : `${movieData.length} Result`} for "{search}"
                </h4>
                {movieData}
            </div>
        </div>
    )
}

export default withRouter(SearchResults)