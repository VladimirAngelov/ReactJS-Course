import {useContext} from 'react'
import {Link, Redirect} from 'react-router-dom';
import style from './Categories.module.css'
import {Context} from "../../../Store/Store";

const Categories = () => {
    const [user] = useContext(Context)

    return (
        <div>
            <h2 className={style.title}>Categories</h2>
            <div className="row">
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
            <div className="row">
                <div className={style.categoriesImages}>
                    <Link to="/movies/fantasy" className={style.categoryBox}><img src="/fantasy.jpg" width={250}
                                                                                 height={350} alt="fantasy"/></Link>
                    <Link to="/movies/adventure" className={style.categoryBox}><img src="/adventure.jpg" width={250}
                                                                                 height={350} alt="adventure"/></Link>
                    <Link to="/movies/thriller" className={style.categoryBox}><img src="/thriller.jpg" width={250}
                                                                                height={350} alt="thriller"/></Link>
                    <Link to="/movies/mystery" className={style.categoryBox}><img src="/mystery.jpg" width={250}
                                                                                 height={350} alt="mystery"/></Link>
                    <Link to="/movies/crime" className={style.categoryBox}><img src="/crime.jpg" width={250}
                                                                                  height={350} alt="crime"/></Link>
                    {user.username === '' && <Redirect to="/login"/>}
                </div>
            </div>
        </div>

    )
}

export default Categories