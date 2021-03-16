export const logout = () => {
    return fetch('/logout')
        .then(res => res.json())
        .then(data => data)
}