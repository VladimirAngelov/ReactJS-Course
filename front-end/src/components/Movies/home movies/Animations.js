import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getMovies} from "../../../movie-services/requests";
const imageUrl = `http://image.tmdb.org/t/p/w400`

export default class Animations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        getMovies('animations')
            .then((res) => {
                let data = res.slice(0, 10)
                this.setState({data: data})
            })
    }

    render() {

        const movieData = this.state.data.map(movie =>
            <span className="home-movie-pictures" key={movie.id}>
                    <Link to={'/movie/details/' + movie.id}><img  className="home-images" src={imageUrl + movie.poster_path} width={120} height={170} alt={movie.title}/></Link>
            </span>
        )

        return (
            <div className="">
                <Link to="/movies/animations"><h4 className="home-title">Animations<span className="see-more"> See more</span></h4></Link>
                <div className="home-movie-pictures">
                    {movieData}
                </div>
            </div>
        )
    }
}