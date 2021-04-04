import {Link} from "react-router-dom";
const imageUrl = `http://image.tmdb.org/t/p/w400`

const HomeMovieCard = ({movie}) => {
    return (
        <>
        <span className="home-movie-pictures" key={movie.id}>
                <Link to={'/movie/details/' + movie.id}>
                    <img className="home-images"
                         src={movie.poster_path !== null ? `${imageUrl}${movie.poster_path}` : `/notfound.png`}
                         width={126} height={176} alt={movie.title}/>
                </Link>
            </span>
        </>
    )
}

export default HomeMovieCard