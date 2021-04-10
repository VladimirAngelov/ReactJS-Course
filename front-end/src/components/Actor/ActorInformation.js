import {Biography, Titles} from "./StyledActor";
import dateParser from "../../utils/dateParser";
import actorYearsParser from "../../utils/actorYearsParser";

const ActorInformation = ({actor}) => {
    return (
        <>
            {actor.known_for_department && <Titles>Known for: </Titles>}
            <Biography>{actor.known_for_department}</Biography>
            <br/>
            {actor.gender && <Titles>Gender: </Titles>}
            {actor.gender && <Biography>{actor.gender === 1 ? 'Female' : 'Male'}</Biography>}
            <br/>
            {actor.birthday && <Titles>Born: </Titles>}
            {actor.birthday && <Biography>{`${dateParser(actor.birthday)} (${actorYearsParser(actor.birthday)} years old)`}</Biography>}
            <br/>
            {actor.place_of_birth && <Titles>Place of birth: </Titles>}
            <Biography>{actor.place_of_birth}</Biography>
        </>
    )
}

export default ActorInformation