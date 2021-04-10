import styles from "./Movie.module.css";
import React from "react";
import MovieRating from "../Rating";
import movieBudgetParser from "../../../utils/movieBudgetParser";
import dateParser from "../../../utils/dateParser";
import runtimeParser from "../../../utils/runtimeParser";

const BasicInformation = (props) => {
    return (
    <>
        <p className={styles.information}>
            <span className={styles.titles}>Release Date: </span>
            {dateParser(props.movie.release_date)}
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
            {props.movie.budget > 0 ? '$' + movieBudgetParser(props.movie.budget) : ''}
        </p>

        <p className={styles.information}>
            {props.movie?.runtime > 0 ? <span className={styles.titles}>Runtime: </span> : ''}
            {props.movie?.runtime > 0 ? runtimeParser(props.movie.runtime) : ''}
        </p>

        <div className={styles.ratingInfo}>
            {props.movie?.vote_average ? <MovieRating movie={props.movie}/> : ''}
        </div>
    </>
    )
}

export default BasicInformation