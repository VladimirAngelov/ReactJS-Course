import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        const handleSubmit = (e) => {
            fetch(`http://localhost:5000/login`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            }).json().then(() => <Redirect to="/"/>)

            e.preventDefault();
        }

        const handleChange = (event) => {
            this.setState({
                    [event.target.name]: event.target.value,
                }
            );
        }

        return (
            <div className="authForm">
                <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor="username">Username </label>
                    <br/>
                    <input value={this.state.username} onChange={handleChange} type="text" name="username"/>
                    <br/>

                    <label htmlFor="password">Password </label>
                    <br/>
                    <input value={this.state.password} onChange={handleChange} type="password" name="password"/>
                    <br/>

                    <input id="loginBtn" type="submit"/>
                </form>
            </div>
        )
    }
}