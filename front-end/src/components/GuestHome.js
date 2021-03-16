import {Link, Redirect} from "react-router-dom";
import Navbar from "./Navbar";
import {Context} from "../Store/Store";
import {useContext} from 'react';

const GuestHome = (props) => {
    const [user] = useContext(Context)
    console.log(user);

    return (
        <div className="">
            <Navbar/>
            <img id="landing-image" src="/landing-image.png" alt=""/>
            <h2 id="landing-h2">Discover new movies, TV shows and <br/>more..</h2>
            <h4 id='landing-text'>Don’t have an account yet? <Link to="/register">Sign Up</Link><br/>
                or <Link to="/login">Sign In</Link></h4>
            {user.username !== '' && <Redirect to="/home"/>}
        </div>
    )
}

export default GuestHome;