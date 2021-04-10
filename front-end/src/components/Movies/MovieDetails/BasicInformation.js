import styles from "./Movie.module.css";
import React from "react";
import MovieRating from "../Rating";

const BasicInformation = (props) => {
    const hours = props.movie?.runtime / 60
    const minutes = (hours - Math.trunc(hours)) * 60
    const runtime = `${Math.trunc(hours)}h : ${Math.ceil(minutes)}m`

    return (
    <>
        <p className={styles.information}>
            <span className={styles.titles}>Release Date: </span>
            {props.movie.release_date || props.movie.first_air_date}
        </p>

        <p className={styles.information}>
            {props.movie.genres?.length > 0 ? <span className={styles.titles}>Genres: </span> : ''}
            {props.genres?.length > 0 ? props.genres : ''}
        </p>

        <p className={styles.information}>
            {props.countries?.length > 0 ? <span className={styles.titles}>Countries: </span> : ''}
            {props.countries?.length > 0 ? props.countries : ''}
        </p>

        <p className={styles.information}>
            {props.movie.budget > 0 ? <span className={styles.titles}>Budget: </span> : ''}
            {props.movie.budget > 0 ? '$' + props.movie.budget : ''}
        </p>

        <p className={styles.information}>
            {props.movie?.runtime > 0 ? <span className={styles.titles}>Runtime: </span> : ''}
            {props.movie?.runtime > 0 ? runtime : ''}
        </p>

        <p className={styles.information}>
            <MovieRating movie={props.movie}/>
        </p>
    </>
    )
}

export default BasicInformation