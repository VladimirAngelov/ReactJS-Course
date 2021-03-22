import React, {useState, useEffect, useContext} from 'react'
import styles from './MoviesByCategory.module.css'
import {getMovies} from "../../../movie-services/requests";
import Loader from "../../Loader/Loader";
import {Link, Redirect} from "react-router-dom";
import {Context} from "../../../Store/Store";
const imageUrl = `http://image.tmdb.org/t/p/w400`

const MovieByCategory = (props) => {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(1)
    const [user] = useContext(Context)

    const path = props.match.params.category

    useEffect(() => {
        setCounter(counter + 1)

        getMovies(path, counter)
            .then(movies => {
                setMovies(movies)
                setIsLoading(false)
            }).catch(err => console.log(err))

    }, [path])

    const loadMore = () => {
        setCounter(counter + 1)
        return getMovies(path, counter)
            .then(movies => {
                setMovies((prevState) => {
                    return (prevState.concat(movies))
                })
                setIsLoading(false)
            }).catch(err => console.log(err))
    }

    if (user.username === '') {
        return <Redirect to="/login"/>
    }

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    const firstLine = movies.map(movie =>
        <span className={styles.categoryMoviePictures} key={movie.id}>
                    <Link to={'/movie/details/' + movie.id}>
                        <img className="home-images" src={imageUrl + movie.poster_path} width={126} height={180}
                             alt={movie.title}/>
                    </Link>
            </span>)

    return (
        <div className={`${styles['categories-container']} row`}>
            <div>
                <h3 className={styles.title}>{path.toUpperCase()}</h3>
                <div className={styles.secondLine}>
                    {firstLine}
                    <button id={styles['show-more-movies-button']} onClick={loadMore}>
                        Show More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieByCategory;