import styles from "./Movie.module.css";
import React from "react";

const BasicInformation = (props) => {
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
            {props.movie?.runtime > 0 ? props.movie.runtime + 'm.' : ''}
        </p>

        {/*<p className={styles.information}>*/}
        {/*    {props.productionCompanies?.length > 0 ?*/}
        {/*        <span className={styles.titles}>Production Companies: </span> : ''}*/}
        {/*    {props.productionCompanies?.length > 0 ? props.productionCompanies : ''}*/}
        {/*</p>*/}
    </>
    )
}

export default BasicInformation