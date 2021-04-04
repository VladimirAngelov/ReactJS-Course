import {Link, Redirect, useHistory} from 'react-router-dom';
import {useContext, useState, useRef} from 'react'
import {Context} from "../../Store/Store";
import {logout} from "../../authService/Logout";
import Search from "../Movies/Search/Search";
import styles from './Navbar.module.css'
import {Col, Row, NavDropdown} from 'react-bootstrap'

const Navbar = () => {
    const [user, setUser] = useContext(Context)
    const [searchInput, setSearchInput] = useState(false)
    const [search, setSearch] = useState('')
    const screenWidth = window.screen.width
    const history = useHistory()
    let isLoggedOut = false;

    const handleLogout = () => {
        return logout().then(() => {
            isLoggedOut = true;
            setSearchInput(false)
            return setUser({username: '', _id: ''})
        }).catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            history.push(`/results/${search}`);
            setSearch('');
        }
    }

    return (
        <Row>
            <Col lg={12} xl={screenWidth >= 1400 && 6} className={`${styles["top-navbar"]}`}>
                <Col sm={12}>
                    <Link to="/"><img id={styles.logo} src='/logo.png' alt="the trailers"/></Link>
                </Col>

                {screenWidth >= 1400 ?
                    <>
                        <Col sm={6}>
                            <Link to="/">Home</Link>
                            <Link to="/movies">Movies</Link>
                        </Col>
                    </> :
                    <>
                        <NavDropdown title={<img width={40} height={30} src="./icons8-menu-30.png" alt="menu"/>}
                                     id="basic-nav-dropdown">

                            <NavDropdown.Item>
                                <Link className={styles.dropLink} to="/movies">Movies</Link>
                            </NavDropdown.Item>

                            {user?.username !== '' &&
                            <NavDropdown.Item>
                                <Link className={styles.dropLink} to="/library">My Library</Link>
                            </NavDropdown.Item>}

                            {user?.username === '' &&
                            <NavDropdown.Item>
                                <Link className={styles.dropLink} to="/register">Sign Up</Link>
                            </NavDropdown.Item>}

                            {user?.username === '' && <NavDropdown.Item>
                                <Link className={styles.dropLink} to="/login">Sign In</Link>
                            </NavDropdown.Item>}

                            {user.username !== '' && <NavDropdown.Item onClick={(e) => search ? handleSubmit(e) : setSearchInput(!searchInput)}>
                                Search</NavDropdown.Item>}

                            {user?.username !== '' &&
                            <NavDropdown.Item>
                                <Link className={styles.dropLink} onClick={handleLogout} to="">Logout</Link>
                            </NavDropdown.Item>}

                        </NavDropdown>
                        {searchInput && <Search {...{search, setSearch, handleSubmit}} />}
                    </>
                }
            </Col>

            {
                screenWidth >= 1400 &&
                <>
                    <Col sm={6} md={6} className={styles["right-nav"]}>
                        {user?.username !== '' ? <Link onClick={handleLogout} to="">Logout</Link> : ''}
                        {user?.username !== '' ? <Link to="/library">My Library</Link> : ''}
                        {user?.username !== '' ? '' : <Link to="/login">Sign In</Link>}
                        {user?.username !== '' ? '' : <Link to="/register">Sign Up</Link>}
                        {user?.username !== '' ?
                            <img onClick={(e) => search ? handleSubmit(e) : setSearchInput(!searchInput)}
                                 id={styles["search-icon"]}
                                 src="/icons8-search-20.png" alt=""/> : ''}

                        {searchInput && <Search {...{search, setSearch, handleSubmit}} />}
                    </Col>
                </>
            }
            {isLoggedOut && (<Redirect to="/"/>)}
        </Row>
    )
};

export default Navbar;