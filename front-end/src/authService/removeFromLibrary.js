const removeFromLibrary = (movieId, userId) => {
    return fetch(`/removeFromLibrary/${movieId}/${userId}`, {
        method: 'DELETE',
    }).catch(err => console.log(err))
}

export default removeFromLibrary