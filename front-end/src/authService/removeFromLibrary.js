const removeFromLibrary = (movieId, userId) => {
    return fetch(`/removeFromLibrary/${movieId}/${userId}`, {
        method: 'DELETE',

    })
}

export default removeFromLibrary