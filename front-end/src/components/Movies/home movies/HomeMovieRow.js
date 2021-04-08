import {Link} from "react-router-dom";

const HomeMovieRow = ({screenWidth, movies, name, link}) => {
    return (
        <>
            {!screenWidth && <Link className="home-link" to={`/movies/${link}`}><h4 className="home-title">{name}<span
                className="see-more"> See more</span></h4></Link>}

            <div className="home-movie-pictures">
                {screenWidth && <Link to={`/movies/${link}`}><h4 className="home-title">{name}<span
                    className="see-more"> See more</span></h4></Link>}
                {movies}
            </div>
        </>
    )
}

export default HomeMovieRow