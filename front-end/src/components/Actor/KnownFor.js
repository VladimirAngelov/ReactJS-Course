import {useState, useEffect} from "react";
import {getActorsMovies} from "../../movie-services/requests";
import {KnownForCard, Image, MovieTitle, Title} from "./StyledKnowFor";
import {Link} from 'react-router-dom'
import ActorCrew from "./ActorCrew";

const imageUrl = `http://image.tmdb.org/t/p/w400`

const KnownFor = ({actorId}) => {
    const [actorMovies, setActorMovies] = useState([]);
    const [actorCrew, setActorCrew] = useState([]);

    console.log(actorCrew)

    useEffect(() => {
        getActorsMovies(actorId)
            .then(data => {
                setActorMovies(data.cast)
                setActorCrew(data.crew)
            })
    }, [actorId])

    const knownForMovies = actorMovies.slice(0, 6).map(m => (
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
            <div className="row">
                {knownForMovies}
            </div>
            <ActorCrew actorCrew={actorCrew}/>
        </>
    )
}

export default KnownFor