import React, {Component} from 'react'
import {getMovies} from "../../../movie-services/requests"
import {Link} from "react-router-dom";
const imageUrl = `http://image.tmdb.org/t/p/w400`

export default class TopRated extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        getMovies('top-rated')
            .then((res) => {
                let data = res.slice(0, 10)
                this.setState({data: data})
            })
    }

    render() {
        const movieData = this.state.data.map(movie =>
            <span className="home-movie-pictures" key={movie.id}>
                    <Link to={'/movie/details/' + movie.id}>
                        <img className="home-images" src={movie.poster_path !== null ? `${imageUrl}${movie.poster_path}` : `/notfound.png`} width={126} height={176} alt={movie.title}/>
                    </Link>
            </span>
        )
        return (
            <>
                <Link to="/movies/top-rated"><h4 className="home-title">Top Rated<span className="see-more"> See more</span></h4></Link>
                <div className="home-movie-pictures">
                    {movieData}
                </div>
            </>
        )
    }
}