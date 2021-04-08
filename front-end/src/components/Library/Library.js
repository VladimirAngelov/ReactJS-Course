import React, {useContext, useEffect, useState} from 'react'
import getUserMovies from "../../authService/getUserMovies";
import style from "../Movies/Search/SearchResults.module.css";
import {Link, Redirect} from "react-router-dom";
import libraryStyle from './Library.module.css'
import Loader from "../Loader/Loader";
import {Context} from "../../Store/Store";

const imageUrl = `http://image.tmdb.org/t/p/w1280/`

const Library = () => {
    const [library, setLibrary] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [user] = useContext(Context)

    useEffect(() => {
        return getUserMovies()
            .then(movies => {
                setLibrary(movies)
                setIsLoading(false)

            }).catch(err => console.log(err))
    }, [isLoading])

    if (user.username === '') {
        return <Redirect to="/login"/>
    }

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    const userMovies = library?.map(movie => {
            return (
                <span className={style['searched-pictures']} key={movie.id}>
                <Link to={'/movie/details/' + movie.id}>
                    <img className="home-images" src={imageUrl + movie.poster_path}
                         width={150} height={220} alt={movie.title}/>
                </Link>
                </span>
            )
        }
    )

    return (
        <>
            <h3 className={libraryStyle['library-title']}>Your Library</h3>

            <div id={libraryStyle['library-container']}>
                {userMovies.length === 0 ? <h5 className={libraryStyle['library-title']}>You don't have movies in the
                    library</h5> : userMovies}
            </div>
        </>
    )
}

export default Library