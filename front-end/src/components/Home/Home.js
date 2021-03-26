import React from 'react';
import FeaturedMovies from "../Movies/home movies/FeaturedMovies";
import Upcoming from "../Movies/home movies/Upcoming";
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
            {/*<div style={{background: '#00ff00'}}>Logged in Successfully</div>*/}
            <div className="row">
                <FeaturedMovies/>
            </div>
            <div className="row">
                <Upcoming/>
            </div>
            <div className="row">
                <TopRated/>
            </div>
        </div>
    )
}

export default Home;