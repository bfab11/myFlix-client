import React, { useState } from 'react';
import './registration-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [birthday, setBirthday ] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      /* Send a request to the server for authentication */
      //axios.post('http://localhost:8080/users', {
      axios.post('https://myflixdbapp.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/');
      })
      .catch(e => {
        console.log('problem registering new user');
      });
    };
  
    return (
      <Row className="d-flex justify-content-center">
        <Card className="align-self-center p-3 m-1">
          <Form>
            <h3>Register</h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control type="date" placeholder="DOB" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="outline-dark" type="submit" onClick={handleSubmit}>
                Submit
            </Button><br />
            <br /><p>Already have an account?</p>
            <Link to="/">
                <Button variant="outline-dark" type="button">Login</Button>
            </Link><br />
          </Form>
        </Card>
      </Row>
    )
  }

