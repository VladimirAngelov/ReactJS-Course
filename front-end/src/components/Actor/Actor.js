import React, {useState, useEffect, useContext} from "react";
import {getActorInfo} from "../../movie-services/requests";
import {Title, Titles, Biography, ReadMore, Image} from "./StyledActor";
import ActorInformation from "./ActorInformation";
import KnownFor from "./KnownFor";
import {Col, Row} from 'react-bootstrap'
import {Redirect, useHistory} from "react-router-dom";
import {Context} from "../../Store/Store";

const Actor = ({match}) => {
    const actorId = match.params.actorId
    const [user] = useContext(Context)
    const [actor, setActor] = useState({})
    const [fullBio, setFullBio] = useState(false)
    const imageUrl = `http://image.tmdb.org/t/p/w1280`
    const history = useHistory()

    useEffect(() => {
        getActorInfo(actorId)
            .then(data => setActor(data))
    }, [actorId])

    if (user.username === '') {
        return <Redirect to={{
            pathname: '/login',
            state: {prevPath: history.location.pathname}
        }}/>
    }

    const smallBiography = actor.biography?.substr(0, 1000)

    return (
        <Row>
            <Col md={3}>
            <span>
                <Image src={actor.profile_path !== null ? `${imageUrl}${actor.profile_path}` : `/profile-picture.png`}/>
            </span>
                {
                    (actor.biography?.length > 1000 && fullBio) && <div style={{marginTop: 10}}><ActorInformation actor={actor}/></div>
                }
            </Col>
            <Col md={9}>
                <Title>{actor.name}</Title>
                {actor.biography && <Titles>Biography: </Titles>}
                {actor.biography && <Biography>
                    {fullBio && actor.biography}
                    {!fullBio && `${smallBiography} ${actor.biography?.length > 1000 ? '...' : ''}`}
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
            </Col>
        </Row>
    )
}

export default Actor