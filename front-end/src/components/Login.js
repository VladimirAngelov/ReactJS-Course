import React, {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom';
import Navbar from "./Navbar";
import {Context} from "../Store/Store";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [user, setUser] = useContext(Context)

    if (user.username !== '') {
        return <Redirect to="/"/>
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        return fetch(`/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        }).then(res => res.json())
            .then((token) => {
                console.log(token)
                if (token.message) throw new Error(token.message);

                setUser({username})
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



    return (
        <div>
            <Navbar/>
            <div className="authForm">
                <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor="username">Username </label>
                    <br/>
                    <input value={username} onChange={updateUsername} type="text" name="username"/>
                    <br/>

                    <label htmlFor="password">Password </label>
                    <br/>
                    <input value={password} onChange={updatePassword} type="password"
                           name="password"/>
                    <br/>

                    <input id="loginBtn" type="submit"/>
                    <p className="error-notification">{error}</p>

                </form>
            </div>
        </div>
    )
}

export default Login;