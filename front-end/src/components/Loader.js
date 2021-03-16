import style from './Loader.module.css'

const Loader = () => {
    return (
        <div className={style['loading-element']}>
            <img className={style['app-loader']} src="/icons8-loading-50.png" alt=""/>
        </div>
    )
}

export default Loader;