import {useState, useEffect} from "react";
import {getActorsMovies} from "../../movie-services/requests";
import {KnownForCard, Image, MovieTitle, Title} from "./StyledKnowFor";
import {Link} from 'react-router-dom'
import ActorCrew from "./ActorCrew";
import {Row} from 'react-bootstrap'

const imageUrl = `http://image.tmdb.org/t/p/w400`

const KnownFor = ({actorId}) => {
    const [actorMovies, setActorMovies] = useState([]);
    const [actorCrew, setActorCrew] = useState([]);

    const filteredCrew = actorCrew.filter(c => c.release_date)

    useEffect(() => {
        getActorsMovies(actorId)
            .then(data => {
                setActorMovies(data.cast)
                setActorCrew(data.crew)
            })
    }, [actorId])

    const knownForMovies = actorMovies?.slice(0, 6).map(m => (
        <KnownForCard key={m.id}>
            <Link to={`/movie/details/${m.id}`}>
                <Image src={m.poster_path !== null ? `${imageUrl}${m.poster_path}` : `/notfound.png`}/>
            </Link>
            <MovieTitle>{m.title}</MovieTitle>
        </KnownForCard>
    ))
    return (
        <>
            <Title>Known For</Title>
            <Row>
                {knownForMovies}
            </Row>

            <Row>
                {filteredCrew?.length > 0 && <ActorCrew actorCrew={filteredCrew}/>}
            </Row>
        </>
    )
}

export default KnownFor