import {Component} from 'react'
import {getMovies} from "../../../movie-services/requests";
import Loader from "../../Loader/Loader";
import {Row} from 'react-bootstrap';
import HomeMovieCard from "./HomeMovieCard";
import HomeMovieRow from "./HomeMovieRow";
const screenWidth = window.screen.width <= 1400

export default class HomeMovies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            featured: [],
            upcoming: [],
            topRated: [],
            isLoading: true
        }
    }

    componentDidMount() {
        getMovies('featured')
            .then((res) => {
                let data = res.slice(0, 10)
                this.setState({featured: data, isLoading: false})
            })

        getMovies('upcoming')
            .then((res) => {
                let data = res.slice(0, 10)
                this.setState({upcoming: data, isLoading: false})
            })

        getMovies('top-rated')
            .then((res) => {
                let data = res.slice(0, 10)
                this.setState({topRated: data, isLoading: false})
            })
    }

    render() {
        if (this.state.isLoading) {
            return <Loader/>
        }

        const featured = this.state.featured.map(movie => <HomeMovieCard key={movie.id} movie={movie}/>)

        const upcoming = this.state.upcoming.map(movie => <HomeMovieCard key={movie.id} movie={movie}/>)

        const topRated = this.state.topRated.map(movie => <HomeMovieCard key={movie.id} movie={movie}/>)

        return (
            <>
                <Row>
                    <HomeMovieRow movies={featured} name="Featured" link="featured" screenWidth={screenWidth}/>
                </Row>
                <Row>
                    <HomeMovieRow movies={upcoming} name="Upcoming" link="upcoming" screenWidth={screenWidth}/>
                </Row>
                <Row>
                    <HomeMovieRow movies={topRated} name="Top Rated" link="top-rated" screenWidth={screenWidth}/>
                </Row>
            </>
        )
    }
}