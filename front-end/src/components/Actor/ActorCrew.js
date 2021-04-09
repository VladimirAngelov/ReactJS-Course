import {Title, Table, Td, Th} from "./StyledActorCrew";
import {Link} from 'react-router-dom'

const ActorCrew = ({actorCrew}) => {
    console.log(actorCrew)
    const credits = actorCrew.sort((a, b) => b.release_date?.split('-')[0] - a.release_date?.split('-')[0]).map(c => (
        <tr key={c.credit_id}>
            <>
                <Td>{c.release_date?.split('-')[0]}</Td>
                <Td><Link to={`/movie/details/${c.id}`} >{c.title}</Link></Td>
                <Td>{c.job}</Td>
            </>
        </tr>
    ))
    return (
        <>
            <Title>Credits</Title>
            <Table>
                <tbody>
                <tr>
                    <Th>Year</Th>
                    <Th>Movie</Th>
                    <Th>Job</Th>
                </tr>
                {credits}
                </tbody>
            </Table>

        </>
    )
}

export default ActorCrew