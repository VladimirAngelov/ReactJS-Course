import React, {useState, useContext, useEffect} from 'react';
import {Context} from "../../../Store/Store";
import {Redirect} from 'react-router-dom'
import styles from './Movie.module.css'
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer'
import getUserMovies from "../../../authService/getUserMovies";
import removeFromLibrary from "../../../authService/removeFromLibrary";
import BasicInformation from "./BasicInformation";
import MovieCredits from "./MovieCredits";

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
    const [isLarge, setIsLarge] = useState(false)
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
            setIsLarge(false)
        } else {
            movieTrailer(movie?.title || '')
                .then(url => {
                    if (props.movie.overview?.length > 200) setIsLarge(true)

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

                {!isLarge && <BasicInformation movie={props.movie} genres={props.genres} countries={props.countries}
                                               productionCompanies={props.productionCompanies}/>}

                {isInLibrary
                    ? <button id={styles.libraryButton} onClick={handleRemoveFromLibrary}>Remove from
                        Library</button>
                    : <button id={styles.libraryButton} onClick={handleLibraryClick}>Add to Library</button>}
            </div>

            <div className={`${styles.video} col`}>
                <div className="video-player">
                    {error && <p className="error-notification">{error}</p>}
                    {trailerUrl && <YouTube videoId={trailerUrl} opt={options}/>}
                    {isLarge && <BasicInformation movie={props.movie} genres={props.genres} countries={props.countries}
                                                  productionCompanies={props.productionCompanies}/>}
                </div>
            </div>
            {user.username === '' && <Redirect to="/login"/>}
            <div className="row">
                <MovieCredits/>
            </div>
        </>
    )
}

export default Movie;