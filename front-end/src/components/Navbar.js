// import logo from '../../public/logo.png'

const Navbar = (props) => {
    return (
        <div className="navigation">
            <div className="top-navbar">
                <img id="logo" src='/logo.png' alt="the movies"/>
                <a href="/home">Home</a>
                <a href="/popular">Popular</a>
                <a href="/movies">Movies</a>
                <a href="/tv-shows">Tv Shows</a>
                <div className="right-nav">
                    <a href="/register">Sign Up</a>
                    <a href="/login">Sign In</a>
                </div>
            </div>
        </div>
    )
};

export default Navbar;