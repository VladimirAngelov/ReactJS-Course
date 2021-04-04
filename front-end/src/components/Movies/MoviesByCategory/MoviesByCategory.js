import React, {useState, useEffect, useContext} from 'react'
import styles from './MoviesByCategory.module.css'
import {getMovies} from "../../../movie-services/requests";
import Loader from "../../Loader/Loader";
import {Link, Redirect, useHistory} from "react-router-dom";
import {Context} from "../../../Store/Store";
import {Row, Col} from 'react-bootstrap'

const imageUrl = `http://image.tmdb.org/t/p/w400`

const MovieByCategory = (props) => {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(1)
    const [user] = useContext(Context)
    const history = useHistory()

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
                    return [...prevState, ...movies]
                })
                setIsLoading(false)
            }).catch(err => console.log(err))
    }

    if (user.username === '') {
        return <Redirect to={{
            pathname: '/login',
            state: {prevPath: history.location.pathname}
        }}/>
    }

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    const allMovies = movies.map(movie =>
        <span className={styles.categoryMoviePictures} key={movie.id}>
                    <Link to={'/movie/details/' + movie.id}>
                        <img className="home-images"
                             src={movie.poster_path !== null ? `${imageUrl}${movie.poster_path}` : `/notfound.png`}
                             width={126} height={180}
                             alt={movie.title}/>
                    </Link>
            </span>)

    return (
        <Row className={`${styles['categories-container']}`}>
            <h3 className={styles.title}>{path.toUpperCase()}</h3>
            <div className={styles.allMovies}>
                {allMovies}
                <button id={styles['show-more-movies-button']} onClick={loadMore}>
                    Show More
                </button>
            </div>
        </Row>
    )
}

export default MovieByCategory;