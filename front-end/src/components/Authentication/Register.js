import React, {useState, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Context} from "../../Store/Store";
import {strongPasswordPattern} from "../../utils/constants";
import validateInputs from "../../utils/validateInputs";

const Register = () => {
    const [user, setUser] = useContext(Context)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState('')
    const [passwordInformation, setPasswordInformation] = useState(false)

    if (error) {
        setTimeout(() => {
            setError(false)
        }, 3000)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validateInputs(username, password, repeatPassword, setError, setUser)
    }

    const onFocusHandler = e => {
        if (!strongPasswordPattern.test(e.target.value)) {
            setPasswordInformation(true)
        }
    }

    if (user.username !== '') return <Redirect to="/"/>;

    return (
        <div className="auth-container">
            <div className="authForm">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username </label>
                    <br/>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value.trim())}
                        type="text" name="username"/>
                    <br/>

                    <label htmlFor="password">Password </label>
                    <br/>
                    <input
                        value={password}
                        onChange={(e) => {
                            if (strongPasswordPattern.test(e.target.value)) setPasswordInformation(false)
                            setPassword(e.target.value.trim())
                        }}
                        onFocus={onFocusHandler}
                        type="password"
                        name="password"/>
                    <br/>

                    {passwordInformation && <div style={{backgroundColor: '#ababab', marginTop: 10, width: 300, borderRadius: 5}}>
                        Password must be at least 6 characters, must contain 1 or more uppercase,
                        lowercase and digit or special characters.
                    </div>}

                    <label htmlFor="repeatPassword">Repeat password </label>
                    <br/>
                    <input
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value.trim())}
                        type="password"
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