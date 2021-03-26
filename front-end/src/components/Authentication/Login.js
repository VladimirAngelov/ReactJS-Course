import React, {useState, useContext} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {Context} from "../../Store/Store";
import styles from "../GuestHome/GuestHome.module.css";

const Login = ({location}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [user, setUser] = useContext(Context)
    const previousPath = location.state?.prevPath

    if (error) {
        setTimeout(() => {
            setError(false)
        }, 2000)
    }

    if (user.username !== '') {
        if (previousPath) {
            return <Redirect to={previousPath}/>
        } else {
            return <Redirect to="/"/>
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        return fetch(`/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
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

    return (
        <div>
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
                    <p className="underAuthButtonText">Don’t have an account yet? <Link to="/register">Sign Up</Link></p>
                    <p className="error-notification">{error}</p>
                </form>
            </div>
        </div>
    )
}

export default Login;