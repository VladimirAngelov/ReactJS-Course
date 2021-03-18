import React from 'react';
import FeaturedMovies from "../Movies/home movies/FeaturedMovies";
import Animations from "../Movies/home movies/Animations";
import TopRated from "../Movies/home movies/TopRated";
import {Context} from "../../Store/Store";
import {useContext} from 'react';
import {Redirect} from "react-router-dom";

const Home = () => {
    const [user] = useContext(Context)

    if (user.username === '') {
        return <Redirect to="/login"/>
    }

    return (
        <div>
            <div className="row">
                <FeaturedMovies/>
            </div>
            <div className="row">
                <TopRated/>
            </div>
            <div className="row">
                <Animations/>
            </div>
        </div>
    )
}

export default Home;