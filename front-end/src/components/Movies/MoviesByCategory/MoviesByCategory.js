import React, {useState, useEffect} from 'react'
import styles from './MoviesByCategory.module.css'
import {getMovies} from "../../../movie-services/requests";
import Loader from "../../Loader/Loader";
import {Link} from "react-router-dom";

const imageUrl = `http://image.tmdb.org/t/p/w400`

const MovieByCategory = () => {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const path = window.location.pathname.split('/').slice(-1)[0]

    useEffect(() => {
        getMovies(path)
            .then(movies => {
                setMovies(movies)
                setIsLoading(false)
            }).catch(err => console.log(err))

    }, [path])

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    let kind = path === 'tv-shows' ? '/tv-show' : '/movie'

    const firstLine = movies.map(movie =>
        <span className={styles.categoryMoviePictures} key={movie.id}>
                    <Link to={kind + '/details/' + movie.id}>
                        <img className="home-images" src={imageUrl + movie.poster_path} width={120} height={170}
                             alt={movie.title}/>
                    </Link>
            </span>)
    const secondLine = firstLine.splice(10, 10)

    return (
        <div className={`${styles['categories-container']} row`}>
            <div >
                <h3 className={styles.title}>{path.toUpperCase()}</h3>
                <div>
                    {firstLine}
                </div>
                <div className={styles.secondLine}>
                    {secondLine}
                </div>
            </div>
        </div>
    )
}

export default MovieByCategory;