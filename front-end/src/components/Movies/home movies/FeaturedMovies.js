import React, {Component} from 'react'
import {getMovies} from "../../../movie-services/requests";
import {Link} from "react-router-dom";
import Loader from "../../Loader/Loader";

const imageUrl = `http://image.tmdb.org/t/p/w400`

export default class FeaturedMovies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount() {
        getMovies('featured')
            .then((res) => {
                let data = res.slice(0, 10)
                this.setState({data: data, isLoading: false})
            })
    }

    render() {
        if (this.state.isLoading) {
            return <Loader/>
        }

        const movieData = this.state.data.map(movie =>
            <span className="home-movie-pictures" key={movie.id}>
                <Link to={'/movie/details/' + movie.id}><img className="home-images" src={imageUrl + movie.poster_path} width={120} height={170} alt={movie.title}/></Link>
            </span>
        )
        return (
            <div className="">

                <Link to="/movies/featured"><h4 className="home-title">Featured<span
                    className="see-more"> See more</span></h4></Link>

                <div className="home-movie-pictures">
                    {movieData}
                </div>
            </div>
        )
    }
}