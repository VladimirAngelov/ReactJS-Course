const getUserMovies = () => {
    return fetch('/getUserMovies')
        .then(res => res.json())
}

export default getUserMovies