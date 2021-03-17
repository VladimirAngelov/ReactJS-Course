import {Link, Redirect, useHistory} from 'react-router-dom';
import {useContext, useState} from 'react'
import {Context} from "../../Store/Store";
import {logout} from "../../authService/Logout";
import Search from "../Movies/Search/Search";
import styles from './Navbar.module.css'

const Navbar = () => {
    const [user, setUser] = useContext(Context)
    const [searchInput, setSearchInput] = useState(false)
    const [search, setSearch] = useState('')
    let isLoggedOut = false;
    const history = useHistory()

    const handleLogout = () => {
        return logout().then(() => {
            isLoggedOut = true;
            return setUser({username: '', _id: ''})
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search) {
            history.push(`/results/${search}`);
            setSearch('');
        }
    }

    return (
        <div className="row">
            <div className={styles["top-navbar"]}>
                <img id={styles.logo} src='/logo.png' alt="the trailers"/>
                <Link to="/">Home</Link>
                <Link to="/movies">Movies</Link>
                {/*<Link to="/movies/tv-shows">TV Shows</Link>*/}

                <div className={styles["right-nav"]}>

                    {user?.username !== '' ? <Link to="/library">My Library</Link> : ''}
                    {user?.username !== '' ? <Link onClick={handleLogout} to="">Logout</Link> : ''}
                    {user?.username !== '' ? '' : <Link to="/register">Sign Up</Link>}
                    {user?.username !== '' ? '' : <Link to="/login">Sign In</Link>}
                </div>
                {user?.username !== '' ?
                    <img onClick={(e) => search ? handleSubmit(e) : setSearchInput(!searchInput)} id={styles["search-icon"]}
                         src="/icons8-search-20.png" alt=""/> : ''}

                {searchInput && <Search {...{search, setSearch, handleSubmit}} />}
            </div>
            {isLoggedOut && (<Redirect to="/"/>)}
        </div>
    )
};

export default Navbar;