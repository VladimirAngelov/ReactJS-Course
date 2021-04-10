import Rate from 'rc-rate'
import 'rc-rate/assets/index.css';

const MovieRating = ({movie}) => {

    return (
        <>
            <Rate size={26} allowHalf={true} value={movie?.vote_average / 2} disabled={true} count={5}/>
        </>
    )
}

export default MovieRating