import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = () => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication
        // Then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    return (
        <form className="login-form">
            <label className="loginput">
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label><br />
            <label className="loginput">
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label><br />
            <span>
                <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Submit</Button>
                <Button variant="outline-dark" type="secondary" onClick={props.toggleRegister}>Register</Button>
            </span>
        </form>
    );
}

export function Button({ label }) {
    return <button>{label}</button>
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func,
};