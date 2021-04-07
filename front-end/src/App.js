import './App.css'
import React, {useContext, useEffect, useState} from 'react'
import {Route, HashRouter, Switch} from "react-router-dom"
import {getUser} from "./authService/getUser";
import {Context} from "./Store/Store";

import {Container} from 'react-bootstrap'
import Navbar from "./components/Navbar/Navbar";
import GuestHome from "./components/GuestHome/GuestHome"
import Footer from './components/Footer'
import Register from './components/Authentication/Register'
import Login from './components/Authentication/Login'
import Home from './components/Home/Home'
import Library from './components/Library/Library'
import Loader from './components/Loader/Loader'
import Categories from './components/Movies/Categories/Categories'
import MoviesByCategory from './components/Movies/MoviesByCategory/MoviesByCategory'
import Details from './components/Movies/MovieDetails/Details'
import Actor from "./components/Actor/Actor";
import PageNotFound from "./components/404/PageNotFound";
import SearchResults from './components/Movies/Search/SearchResults'

function App() {
    const [user, setUser] = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    let isLoggedIn = user.username !== '';

    useEffect(() => {
        getUser().then(currentUser => {
            if (currentUser.message) {
                return setIsLoading(false)
            }

            setUser({_id: currentUser._id, username: currentUser.username})
            setIsLoading(false)
        }).catch(err => console.log(err))
    }, [setUser])

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <HashRouter>
            <Container>
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={isLoggedIn ? Home : GuestHome}/>
                    <Route path="/movie/details/:id" exact component={Details}/>
                    <Route path="/tv-show/details/:id" exact component={Details}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/movies" exact component={Categories}/>
                    <Route path="/movies/:category" exact component={MoviesByCategory}/>
                    <Route path="/results/:search" exaxt component={SearchResults}/>
                    <Route path="/library" exaxt component={Library}/>
                    <Route path="/actor/:actorId" exact component={Actor}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Container>
            <Footer/>
        </HashRouter>
    )
}

export default App;
