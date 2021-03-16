import {useContext} from 'react'
import {Link, Redirect} from 'react-router-dom';
import Navbar from "../Navbar";
import style from './Categories.module.css'
import {Context} from "../../Store/Store";

const Categories = () => {
    const [user] = useContext(Context)

    return (
        <div>
            <Navbar/>
            <div className="row">
                <h2 className={style.title}>Categories</h2>
                <div className={style.categoriesImages}>
                    <Link to="/movies/action" className={style.categoryBox}><img src="/action.jpg" width={250}
                                                                                 height={350} alt="action"/></Link>
                    <Link to="/movies/horror" className={style.categoryBox}><img src="/horror.jpg" width={250}
                                                                                 height={350} alt="horror"/></Link>
                    <Link to="/movies/drama" className={style.categoryBox}><img src="/drama.jpg" width={250}
                                                                                height={350} alt="drama"/></Link>
                    <Link to="/movies/comedy" className={style.categoryBox}><img src="/comedy.jpg" width={250}
                                                                                 height={350} alt="comedy"/></Link>
                    <Link to="/movies/romance" className={style.categoryBox}><img src="/romance.jpg" width={250}
                                                                                  height={350} alt="romance"/></Link>
                    {user.username === '' && <Redirect to="/login"/>}
                </div>
            </div>
        </div>

    )
}

export default Categories