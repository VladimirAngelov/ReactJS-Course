import {Link, Redirect} from 'react-router-dom';
import {useContext} from 'react'
import {Context} from "../Store/Store";
import {logout} from "../authService/Logout";
import Search from "./Movies/Search";

const Navbar = () => {
    const [user, setUser] = useContext(Context)
    let isLoggedOut = false;

    const handleLogout = () => {
        return logout().then(() => {
            isLoggedOut = true;
            return setUser({username: '', _id: ''})
        })
    }

    const handleSearch = () => {
        const searchElement = document.getElementById('search')
        if (searchElement.style.display === 'none') {
            searchElement.style.display = 'block'
        } else {
            searchElement.style.display = 'none'
        }
    }

    return (
        <div className="navigation row">
            <div className="top-navbar">
                <img id="logo" src='/logo1.png' alt="the movies"/>
                <Link to="/">Home</Link>
                <Link to="/movies">Movies</Link>
                {/*<Link to="/movies/tv-shows">TV Shows</Link>*/}

                <div className="right-nav">

                    {user?.username !== '' ? <Link to="/library">My Library</Link> : ''}
                    {user?.username !== '' ? <Link onClick={handleLogout} to="">Logout</Link> : ''}
                    {user?.username !== '' ? '' : <Link to="/register">Sign Up</Link>}
                    {user?.username !== '' ? '' : <Link to="/login">Sign In</Link>}
                </div>
                {user?.username !== '' ?
                    <img onClick={handleSearch} id="search-icon" src="/icons8-search-20.png" alt=""/> : ''}

                <span style={{display: 'none'}} id="search">
                    <Search/>
                </span>

            </div>
            {isLoggedOut && (<Redirect to="/"/>)}
        </div>
    )
};

export default Navbar;