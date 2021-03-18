export const getUser = () => {
    return fetch('/getUser')
        .then(res => res.json())
        .then(data => data)
}