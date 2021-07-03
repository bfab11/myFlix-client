import React from "react";

// React components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export default function ProfileView(props) {
    const { Username, Email, Birthday, FavoriteMovies = [] } = props.userData;
    const movies = props.movies;

    return (
        <Container>
            <Row className="profile-view">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Img variant="top" style={{ maxWidth: "50px"}} src={"/images/profile.png" } />
                            <Card.Title>User info</Card.Title>
                            <div className="label h6">Username</div>
                            <div className="value">{Username}</div>

                            <div className="label h6">Password</div>
                            <div className="value">********</div>

                            <div className="label h6">Email</div>
                            <div className="value">{Email}</div>

                            <div className="label h6">Birthday</div>
                            <div className="value">{Birthday && Birthday.slice(0, 10)}</div>

                            <Link to={'/profile/update'}>
                                <Button variant="outline-dark">Update user info</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

        </Container>
    )
}
