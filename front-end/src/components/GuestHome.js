import {Link} from "react-router-dom";

const GuestHome = (props) => {
    console.log(props.data)
    return (
        <div className="">
            <img id="landing-image" src="/landing-image.png" alt=""/>
            <h2 id="landing-h2">Discover new movies, TV shows and <br/>more..</h2>
            <h4 id='landing-text'>Don’t have an account yet? <Link to="/register">Sign Up</Link><br/>
                or <Link to="/login">Sign In</Link></h4>
        </div>
    )
}

export default GuestHome;