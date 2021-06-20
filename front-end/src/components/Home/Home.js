import React from "react"
import HomeMovies from "../Movies/home movies/HomeMovies"
import { Context } from "../../Store/Store"
import { useContext } from "react"
import { Redirect } from "react-router-dom"

const Home = () => {
  const [user] = useContext(Context)

  if (user.username === "") {
    return <Redirect to="/login" />
  }

  return <HomeMovies />
}

export default Home