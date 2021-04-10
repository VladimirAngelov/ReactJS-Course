import React, {useState, useEffect} from 'react'
import {getOneMovie} from "../../../movie-services/requests";
import {Description, Title, Runtime, ShowDetails, RatingInNumbers} from "./StyledTopFeatured";
import {Image, Col} from 'react-bootstrap'
import MovieRating from "../Rating";
import Loader from "../../Loader/Loader";
import {Link} from 'react-router-dom'
import runtimeParser from "../../../utils/runtimeParser";

const imageUrl = `http://image.tmdb.org/t/p/w1280/`

const TopFeatured = ({topFeaturedMovieId}) => {
    const [movie, setMovie] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const screenWidth = window.screen.width

    useEffect(() => {
        getOneMovie(topFeaturedMovieId)
            .then(res => {
                setMovie(res)
                setIsLoading(false)
            })
    }, [topFeaturedMovieId]);

    if (isLoading) return <Loader/>

    return (
        <>
            <Col xl={4}>
                {
                    screenWidth >= 1400 ?
                        <>
                            <Title>
                                {movie?.title} <br/>
                                <MovieRating movie={movie}/>
                                <RatingInNumbers>{`${movie?.vote_average} (tmdb)`}</RatingInNumbers>
                                <Runtime>{runtimeParser(movie.runtime)}</Runtime>
                                <Description>{movie?.overview}</Description>
                                <ShowDetails><Link to={`/movie/details/${movie.id}`}>SHOW DETAILS</Link></ShowDetails>
                            </Title>
                        </> :
                        <>
                            <Title>
                                {movie?.title} <br/>
                                <MovieRating movie={movie}/>
                            </Title>
                        </>
                }
            </Col>
            {
                screenWidth >= 1400 ?
                    <>
                        <Image style={{marginTop: -70}} src={`${imageUrl}${movie?.backdrop_path}`} fluid/>
                    </> :
                    <Image src={`${imageUrl}${movie?.backdrop_path}`} fluid/>
            }
        </>
    )
}

export default TopFeatured