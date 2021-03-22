import React, {useState, useEffect} from 'react'
import {getMovieCredits} from "../../../movie-services/requests";
import styles from './MovieCredits.module.css'

const imageUrl = `http://image.tmdb.org/t/p/w400`

const MovieCredits = (props) => {
    const [credits, setCredits] = useState([])
    const [fullCast, setFullCast] = useState(false);

    const movieId = props?.movieId

    useEffect(() => {
        getMovieCredits(movieId)
            .then(c => {
                setCredits(c.cast)
            })
    }, [movieId])

    const movieFullCast = credits?.map(c =>
        <div key={c.id} style={{maxWidth: 162, textAlign: 'center'}}>
                <img className={styles['cast-pictures']}
                     src={c.profile_path !== null ? `${imageUrl + c.profile_path}` : `/profile-picture.png`} width={126}
                     height={180}
                     alt={c.name}/>
            <p className={styles['actor-name']}><strong>{c.name}</strong></p>
            <p className={styles['character-name']}>{c.character}</p>
        </div>
    )

    const moviePartCast = movieFullCast?.slice(0, 8)

    return (
        <>
            <h3 id={styles['credits-title']}>Cast</h3>
            {!fullCast && moviePartCast}
            {fullCast && movieFullCast}

            <button id={styles['show-cast-button']} onClick={() => setFullCast(!fullCast)} >
                {fullCast ? 'Hide full cast' : 'Show full cast'}
            </button>
        </>
    )
}

export default MovieCredits