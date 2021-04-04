import React, {useState, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Context} from "../../Store/Store";

const Register = () => {
    const [user, setUser] = useContext(Context)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState('')

    if (error) {
        setTimeout(() => {
            setError(false)
        }, 2000)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        return fetch(`/register`, {
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

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }
    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value)
    }

    if (user.username !== '') {
        return <Redirect to="/"/>;
    }

    return (
        <div className="auth-container">
            <div className="authForm">

                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username </label>
                    <br/>
                    <input value={username} onChange={updateUsername} type="text" name="username"/>
                    <br/>

                    <label htmlFor="password">Password </label>
                    <br/>
                    <input value={password} onChange={updatePassword} type="password"
                           name="password"/>
                    <br/>

                    <label htmlFor="repeatPassword">Repeat password </label>
                    <br/>
                    <input value={repeatPassword} onChange={updateRepeatPassword} type="password"
                           name="repeatPassword"/>

                    <input id="registerBtn" type="submit"/>
                    <p className="underAuthButtonText">You have an account? <Link to="/login">Sign In</Link></p>
                    <p className="error-notification">{error}</p>

                </form>
            </div>
        </div>
    )
}

export default Register