import React, {useState, useEffect, useContext} from 'react';
import {getOneMovie,} from "../../../movie-services/requests";
import Movie from './Movie'
import {Redirect, useHistory} from "react-router-dom";
import {Context} from "../../../Store/Store";
import {Row} from 'react-bootstrap'

const Details = (props) => {
    const [movie, setMovie] = useState({})
    const movieId = props.match.params.id
    const [user] = useContext(Context)
    const history = useHistory()

    console.log(movie)

    useEffect(() => {
        getOneMovie(movieId)
            .then(res => setMovie(res))
            .catch(err => console.log(err))
    }, [movieId])

    if (user.username === '') {
        return <Redirect to={{
            pathname: '/login',
            state: {prevPath: history.location.pathname}
        }}/>
    }

    const genres = movie.genres?.map(g => g.name).join(', ')
    const countries = movie.production_countries?.map(c => c.name).join(', ')
    const productionCompanies = movie.production_companies?.map(c => c.name).join(', ')

    return (
        <Row>
            <Movie movie={movie} genres={genres} countries={countries} productionCompanies={productionCompanies}/>
        </Row>
    )
}

export default Details