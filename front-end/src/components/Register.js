import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: ''
        }
    }

    render() {
        const handleSubmit = (e) => {
            fetch(`http://localhost:5000/register`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            }).then(() => this.props.history.push('/'))
                .json()

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

                    <label htmlFor="repeatPassword">Repeat password </label>
                    <br/>
                    <input value={this.state.repeatPassword} onChange={handleChange} type="password"
                           name="repeatPassword"/>

                    <input id="registerBtn" type="submit"/>
                </form>
            </div>
        )
    }
}