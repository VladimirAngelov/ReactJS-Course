import React from 'react';
import FeaturedMovies from "./Movies/FeaturedMovies";
import Animations from "./Movies/Animations";
import TopRated from "./Movies/TopRated";
import Navbar from "./Navbar";
import {Context} from "../Store/Store";
import {useContext} from 'react';
import {Redirect} from "react-router-dom";

const Home = () => {
    const [user] = useContext(Context)

    if (user.username === '') {
        return <Redirect to="/login"/>
    }

    return (
        <div>
            <Navbar/>
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