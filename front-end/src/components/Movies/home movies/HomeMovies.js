import {Component} from 'react'
import {getMovies} from "../../../movie-services/requests";
import Loader from "../../Loader/Loader";
import {Row, Col} from 'react-bootstrap';
import HomeMovieCard from "./HomeMovieCard";
import HomeMovieRow from "./HomeMovieRow";
import TopFeatured from './TopFeatured'

const screenWidth = window.screen.width <= 1400

export default class HomeMovies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            featured: [],
            upcoming: [],
            topRated: [],
            firstFeatured: '',
            isLoading: true
        }
    }

    componentDidMount() {
        Promise.all([
            getMovies('featured'),
            getMovies('upcoming'),
            getMovies('top-rated')
        ]).then(([featured, upcoming, topRated]) => {
            this.setState({
                featured: featured.slice(0, 10),
                firstFeatured: featured[Math.floor(Math.random() * 10)],
                upcoming: upcoming.slice(0, 10),
                topRated: topRated.slice(0, 10),
                isLoading: false
            });
            this.featuredIntarval = setInterval(() => this.setState(({firstFeatured: this.state.featured[Math.floor(Math.random() * 10)]})), 10 * 1000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.featuredIntarval);
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
                    <TopFeatured topFeaturedMovieId={this.state.firstFeatured.id}/>
                </Row>
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