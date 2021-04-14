import {usernamePattern, strongPasswordPattern} from "./constants";

export default (username, password, repeatPassword, setError, setUser) => {
    if (!usernamePattern.test(username)) {
        setError('Username must consist only letters and digits.')
    } else if (!strongPasswordPattern.test(password)) {
        setError('Password does not match the requirements.')
    } else if (password !== repeatPassword || password === '' || repeatPassword === '') {
        setError('Please make sure your passwords match.')
    } else {
       fetch(`/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password, repeatPassword})
        }).then(res => res.json())
            .then((response) => {
                if (response.message) throw new Error(response.message);
                setUser({_id: response.user._id, username: response.user.username})
            }).catch(err => {
            console.log(err)
            setError(err.message)
        });
    }
}