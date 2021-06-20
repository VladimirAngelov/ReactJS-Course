import { Link, Redirect } from "react-router-dom"
import { Context } from "../../Store/Store"
import { useContext, useState, useEffect } from "react"
import styles from "./GuestHome.module.css"
import { GuestHomeContainer } from "./GuestHomeStyled"

const GuestHome = () => {
  const [user] = useContext(Context)
  const screenWidth = window.screen.width <= 760

  return (
    <GuestHomeContainer>
      {screenWidth ? <img id={styles["landing-image"]} src="/mobile-image.jpg" alt="" /> :
        <img id={styles["landing-image"]} src="/landing-image-min.png" alt="" />}
      <h2 id={styles["landing-h2"]}>Discover new movies, watch trailers and <br />more..</h2>
      {screenWidth ? <p id={styles["landing-text"]}>Don’t have an account yet? <Link to="/register">Sign Up</Link><br />
          or <Link to="/login">Sign In</Link></p> :
        <h4 id={styles["landing-text"]}>Don’t have an account yet? <Link to="/register">Sign Up</Link><br />
          or <Link to="/login">Sign In</Link></h4>}
      {user.username !== "" && <Redirect to="/home" />}
    </GuestHomeContainer>
  )
}

export default GuestHome