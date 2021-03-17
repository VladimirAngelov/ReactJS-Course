import React, {useState, useContext, useEffect} from 'react';
import {Context} from "../../../Store/Store";
import {Redirect} from 'react-router-dom'
import styles from './Movie.module.css'
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer'
import getUserMovies from "../../../authService/getUserMovies";
import removeFromLibrary from "../../../authService/removeFromLibrary";

const options = {
    height: '200',
    width: '100%',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    }
}
const imageUrl = `http://image.tmdb.org/t/p/w400/`

const Movie = (props) => {
    const [user] = useContext(Context)
    const [trailerUrl, setTrailerUrl] = useState('')
    const [error, setError] = useState('')
    const [isInLibrary, setIsInLibrary] = useState(false)
    const movieId = window.location.pathname.match(/\d+/)[0]

    const icon = document.getElementById('play-icon')
    const image = document.getElementById('details-image')

    useEffect(() => {
        return getUserMovies()
            .then(movies => {
                const found = movies.find(m => m.id.toString() === movieId)

                if (found) setIsInLibrary(true)
            })
    }, [movieId])

    const handleOnMouseOver = () => {
        icon.style.display = 'block'
        image.style.opacity = '70%'
    }

    const handleOnMouseOut = () => {
        image.style.opacity = '100%'
        return icon.style.display = 'none'
    }

    const handleTrailerClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.title || '')
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                }).catch(err => setError('Trailer is not available'))
        }
    }

    const handleLibraryClick = () => {
        return fetch(`/addMovieToLibrary`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId: user._id, movie: props.movie})
        }).then(res => res.json())
            .then(data => {
                if (data.message.includes('Successfully')) setIsInLibrary(true)
            })
    }

    const handleRemoveFromLibrary = () => {
        removeFromLibrary(movieId, user._id)
            .then(res => res.json())
            .then(res => {
                if (res.message.includes('Successfully')) setIsInLibrary(false)
            })
    }
    // console.log(props.movie.overview.length)
    return (
        <>
            <div className="col">
                <div>
                    <img onClick={() => handleTrailerClick(props.movie)} id="details-image"
                         onMouseOver={handleOnMouseOver}
                         onMouseOut={handleOnMouseOut} className={styles.detailsImage}
                         src={imageUrl + props.movie.poster_path || ''} alt={props.movie.title}/>
                </div>
                <span id="play-icon" onClick={() => handleTrailerClick(props.movie)} onMouseOver={handleOnMouseOver}
                      className={styles.playIcon}>
                    <img src="/play-icon.png" alt=""/>
                </span>
            </div>

            <div className="col information">
                <h2 id={styles.title} className={styles.information}>{props.movie.title || props.movie.name}</h2>
                <h4 id={styles.tagline}>{props.movie.tagline?.length > 1 ? `"${props.movie.tagline}"` : ''}</h4>

                <p id={styles.description}>
                    <span className={styles.titles}>Overview: </span>
                    {props.movie.overview}
                </p>

                <p className={styles.information}>
                    <span className={styles.titles}>Release Date: </span>
                    {props.movie.release_date || props.movie.first_air_date}
                </p>

                <p className={styles.information}>
                    <span className={styles.titles}>Genres: </span>
                    {props.genres}
                </p>

                <p className={styles.information}>
                    {props.countries?.length > 0 ? <span className={styles.titles}>Contries: </span> : ''}
                    {props.countries?.length > 0 ? props.countries : ''}
                </p>

                <p className={styles.information}>
                    {props.movie.budget > 0 ? <span className={styles.titles}>Budget: </span> : ''}
                    {props.movie.budget > 0 ? '$' + props.movie.budget : ''}
                </p>

                <p className={styles.information}>
                    {props.movie?.runtime > 0 ? <span className={styles.titles}>Runtime: </span> : ''}
                    {props.movie?.runtime > 0 ? props.movie.runtime + 'm.' : ''}
                </p>

                <p className={styles.information}>
                    {props.productionCompanies?.length > 0 ?
                        <span className={styles.titles}>Production Companies: </span> : ''}
                    {props.productionCompanies?.length > 0 ? props.productionCompanies : ''}
                </p>
                {isInLibrary
                    ? <button id={styles.libraryButton} onClick={handleRemoveFromLibrary}>Remove from
                        Library</button>
                    : <button id={styles.libraryButton} onClick={handleLibraryClick}>Add to Library</button>}
            </div>

            <div className={`${styles.video} col`}>
                <div className="video-player">
                    {error && <p className="error-notification">{error}</p>}
                    {trailerUrl && <YouTube videoId={trailerUrl} opt={options}/>}
                </div>
            </div>
            {user.username === '' && <Redirect to="/login"/>}
        </>
    )
}

export default Movie;