import {Link, Redirect} from "react-router-dom";
import {Context} from "../../Store/Store";
import {useContext} from 'react';
import styles from './GuestHome.module.css'

const GuestHome = (props) => {
    const [user] = useContext(Context)

    return (
        <div>
            <img id={styles["landing-image"]} src="/landing-image.png" alt=""/>
            <h2 id={styles["landing-h2"]}>Discover new movies, watch trailers and <br/>more..</h2>
            <h4 id={styles['landing-text']}>Don’t have an account yet? <Link to="/register">Sign Up</Link><br/>
                or <Link to="/login">Sign In</Link></h4>
            {user.username !== '' && <Redirect to="/home"/>}
        </div>
    )
}

export default GuestHome;