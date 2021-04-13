import React, {useState, useEffect, useContext} from 'react'
import styles from './MoviesByCategory.module.css'
import {getMovies} from "../../../movie-services/requests";
import Loader from "../../Loader/Loader";
import {Link, Redirect, useHistory} from "react-router-dom";
import {Context} from "../../../Store/Store";
import {Row} from 'react-bootstrap'

const imageUrl = `http://image.tmdb.org/t/p/w780`

const MovieByCategory = (props) => {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [user] = useContext(Context)
    const history = useHistory()
    const path = props.match.params.category
    let pageCounter = 2;

    useEffect(() => {
        Promise.all([
            getMovies(path, 1),
            getMovies(path, 2)
        ]).then(([firstPage, secondPage]) => {
            setMovies([...firstPage, ...secondPage])
            setIsLoading(false)
        })

        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling)

    }, [path])

    const loadMore = (pageCounter) => {
        return getMovies(path, pageCounter)
            .then(movies => {
                setMovies((prevState) => {
                    return [...prevState, ...movies]
                })
            }).catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    const isScrolling = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            pageCounter++
            return loadMore(pageCounter)
        }
    }

    if (user.username === '') {
        return <Redirect to={{
            pathname: '/login',
            state: {prevPath: history.location.pathname}
        }}/>
    }

    if (isLoading) return <Loader/>

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
            </div>
        </Row>
    )
}

export default MovieByCategory;