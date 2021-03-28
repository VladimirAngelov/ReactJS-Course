import {useState, useEffect} from "react";
import {getActorInfo} from "../../movie-services/requests";
import {Title, Titles, Biography, ReadMore, Image} from "./StyledActor";
import ActorInformation from "./ActorInformation";
import KnownFor from "./KnownFor";

const Actor = ({match}) => {
    const actorId = match.params.actorId
    const [actor, setActor] = useState({})
    const [fullBio, setFullBio] = useState(false)
    const imageUrl = `http://image.tmdb.org/t/p/w400`

    useEffect(() => {
        getActorInfo(actorId)
            .then(data => setActor(data))
    }, [actorId])

    const smallBiography = actor.biography?.substr(0, 1000)
    console.log(actor)
    return (
        <div className="row">
            <div className="col-3">
            <span>
                <Image src={actor.profile_path !== null ? `${imageUrl}${actor.profile_path}` : `/profile-picture.png`}/>
            </span>
                {
                    (actor.biography?.length > 1000 && fullBio) && <ActorInformation actor={actor}/>
                }
            </div>
            <div className="col-9">
                <Title>{actor.name}</Title>
                {actor.biography && <Titles>Biography: </Titles>}
                {actor.biography && <Biography>
                    {fullBio && actor.biography}
                    {!fullBio && `${smallBiography}`}
                    {
                        actor.biography?.length > 1000 &&
                        <ReadMore onClick={() => setFullBio(!fullBio)}>
                            {fullBio ? `< Hide` : `Read More >`}
                        </ReadMore>
                    }

                </Biography>}
                <div>
                    {
                        !fullBio && <ActorInformation actor={actor}/>
                    }
                </div>
                <KnownFor actorId={actorId}/>
            </div>

        </div>
    )
}

export default Actor