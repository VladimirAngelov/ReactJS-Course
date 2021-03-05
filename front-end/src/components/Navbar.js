// import logo from '../../public/logo.png'
import {Link} from 'react-router-dom';

const Navbar = (props) => {
    return (
        <div className="navigation">
            <div className="top-navbar">
                <img id="logo" src='/logo.png' alt="the movies"/>
                <Link to="/">Home</Link>
                <Link to="/popular">Popular</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/tv-shows">TV Shows</Link>
                <div className="right-nav">
                    <Link to="/register">Sign Up</Link>
                    <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    )
};

export default Navbar;