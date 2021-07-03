import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import axios from "axios";
import { Link } from "react-router-dom";

export default function ProfileUpdate(props) {
    const {
        Username: currUsername,
        Email: currEmail,
        Birthday: currBirthday
    } = props.userData;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        setUsername(currUsername);
        setEmail(currEmail);
        setBirthday(currBirthday);
    }, [currUsername, currEmail, currBirthday]);

    const user= props.user;

    function deleteAcc(token) {
        console.log('Not deleted yet');
        axios.delete(`https://myflixdbapp.herokuapp.com/users/${user}`, 
        { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
        .then(response => {
          console.log(response);
          console.log(`${user} has been deleted`);
        })
        .catch(e => {
          console.log('There is an error');
          console.log(e);
        })
    }

    const handleUpdate = e => {
        e.preventDefault();
        const userData = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        axios.put(
            `https://myflixdbapp.herokuapp.com/users/${user}`,
            userInfo,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            },
        )
        .then(response => {
            props.updateUser(userInfo);
            alert('User info was updated successfully');
        })
        .catch(e => {
            const errors = e.response.data.errors || [];
            let errorMessage = '';
            errors.forEach(err => {
                errorMessage += err.msg;
            });
            alert(`There was an error ${errorMessage}`)
            console.log('Error updating user info');
        });
    }
    return (
        <Container>
            <Row className="profile-view">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Img variant="top" style={{ maxWidth: "50px"}} src={process.env.PUBLIC_URL + "/images/update.png" } />

                            <Form>
                                Please update your profile information.
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username: </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="New Username"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password: </Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="New Password"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email: </Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBirthday">
                                    <Form.Label>Birthday: </Form.Label>
                                    <Form.Control

                                        value={birthday}
                                        onChange={e => setBirthday(e.target.value)}
                                        placeholder="DOB in format mm/dd/yyyy"
                                    />
                                </Form.Group>
                                <Button variant="outline-dark" type="submit" onClick={handleUpdate}>
                                    Update
                                </Button>
                                <Link to={`/profile`}>
                                    <Button className="back-btn" variant="outline-dark" type="button">
                                        BACK
                                    </Button>
                                </Link>
                                <Button className="m-3 bttn" variant="outline-dark" type="button" onClick={ () => { deleteAcc(token); onSignOut(null); history.push('/'); } }>Delete Account</Button>
                                <Form.Text className="text-muted">
                                    Your personal information will never be shared.
                                </Form.Text>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}