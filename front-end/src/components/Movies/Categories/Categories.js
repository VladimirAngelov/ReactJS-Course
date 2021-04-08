import React, {useContext} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom';
import style from './Categories.module.css'
import {Context} from "../../../Store/Store";
import {Row} from 'react-bootstrap';

const Categories = () => {
    const [user] = useContext(Context)
    const history = useHistory()

    if (user.username === '') {
        return <Redirect to={{
            pathname: '/login',
            state: {prevPath: history.location.pathname}
        }}/>
    }

    return (
        <div className={style.categoryContainer}>
            <h2 className={style.title}>Categories</h2>
            <Row>
                <div className={style.categoriesImages}>
                    <Link to="/movies/action" className={style.categoryBox}>
                        <img src="/action.jpg" width={254} height={350} alt="action"/>
                    </Link>
                    <Link to="/movies/horror" className={style.categoryBox}>
                        <img src="/horror.jpg" width={254} height={350} alt="horror"/>
                    </Link>
                    <Link to="/movies/drama" className={style.categoryBox}>
                        <img src="/drama.jpg" width={254} height={350} alt="drama"/>
                    </Link>
                    <Link to="/movies/comedy" className={style.categoryBox}>
                        <img src="/comedy.jpg" width={254} height={350} alt="comedy"/>
                    </Link>
                    <Link to="/movies/romance" className={style.categoryBox}>
                        <img src="/romance.jpg" width={254} height={350} alt="romance"/>
                    </Link>
                    {user.username === '' && <Redirect to="/login"/>}
                </div>
            </Row>
            <Row>
                <div className={style.categoriesImages}>
                    <Link to="/movies/fantasy" className={style.categoryBox}>
                        <img src="/fantasy.jpg" width={254} height={350} alt="fantasy"/>
                    </Link>
                    <Link to="/movies/adventure" className={style.categoryBox}>
                        <img src="/adventure.jpg" width={254} height={350} alt="adventure"/>
                    </Link>
                    <Link to="/movies/thriller" className={style.categoryBox}>
                        <img src="/thriller.jpg" width={254} height={350} alt="thriller"/>
                    </Link>
                    <Link to="/movies/mystery" className={style.categoryBox}>
                        <img src="/mystery.jpg" width={254} height={350} alt="mystery"/>
                    </Link>
                    <Link to="/movies/crime" className={style.categoryBox}>
                        <img src="/crime.jpg" width={254} height={350} alt="crime"/>
                    </Link>
                </div>
            </Row>
        </div>

    )
}

export default Categories