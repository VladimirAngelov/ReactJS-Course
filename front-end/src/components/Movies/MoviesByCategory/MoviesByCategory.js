import React, {useState, useEffect} from 'react'
import styles from './MoviesByCategory.module.css'
import {getMovies} from "../../../movie-services/requests";
import Loader from "../../Loader/Loader";
import {Link} from "react-router-dom";

const imageUrl = `http://image.tmdb.org/t/p/w400`

const MovieByCategory = () => {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(1)

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

    const firstLine = movies.map(movie =>
        <span className={styles.categoryMoviePictures} key={movie.id}>
                    <Link to={'/movie/details/' + movie.id}>
                        <img className="home-images" src={imageUrl + movie.poster_path} width={126} height={180}
                             alt={movie.title}/>
                    </Link>
            </span>)
    const secondLine = firstLine.splice(10, 10)

    return (
        <div className={`${styles['categories-container']} row`}>
            <div >
                <h3 className={styles.title}>{path.toUpperCase()}</h3>
                <div className={styles.secondLine}>
                    {firstLine}
                </div>
                <div className={styles.secondLine}>
                    {secondLine}
                </div>

                {/*<div className={styles.secondLine}>*/}
                {/*    {counter > 1 && secondLine}*/}
                {/*</div>*/}

                {/*<div className={styles.secondLine}>*/}
                {/*    {counter > 2 && secondLine}*/}
                {/*</div>*/}

                {/*<div className={styles.secondLine}>*/}
                {/*    {counter > 3 && secondLine}*/}
                {/*</div>*/}

                {/*<div className={styles.secondLine}>*/}
                {/*    {counter > 4 && secondLine}*/}
                {/*</div>*/}

                {/*<div style={{textAlign: 'center'}}>*/}
                {/*    { counter < 5 && <button onClick={() => setCounter(counter + 1)} style={{color: 'white', marginTop: 20, fontSize: 20, border: 0, background: 'transparent'}}>Show More</button>}*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default MovieByCategory;