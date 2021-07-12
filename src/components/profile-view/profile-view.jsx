import React from "react";

// React components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export default function ProfileView(props) {
    const { Username, Email, Birthday, FavoriteMovies = [] } = props.userData;
    const movies = props.movies;
    const favorites = movies.filter(movie => FavoriteMovies.indexOf(movie._id) > -1);
    const { onBackClick } = props;
    return (
        <Container>
            <Row className="profile-view">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Img variant="top" style={{ maxWidth: "50px"}} src={"/images/profile.png" } />
                            <Card.Title>User info</Card.Title>
                            <div className="label h6">USERNAME</div>
                            <div className="value">{Username}</div><br />

                            <div className="label h6">PASSWORD</div>
                            <div className="value">********</div><br />

                            <div className="label h6">EMAIL</div>
                            <div className="value">{Email}</div><br />

                            <div className="label h6">BIRTHDAY</div>
                            <div className="value">{Birthday && Birthday.slice(0, 10)}</div><br />

                            <Link to={'/profile/update'}>
                                <Button variant="outline-dark">Update user info</Button>
                            </Link>
                            <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button><br />
                            <br /><div className="card-title h5 h5 fav-movies">Favorite Movies</div>
                            {
                                favorites.map(m => (
                                    <Link key={m._id} to={`/movies/${m._id}`}>
                                        <div><Button variant="outline-dark">{m.Title}</Button></div>
                                    </Link>
                                ))
                            }
                            
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

        </Container>
    )
}

export default connect (({ movies }) => ({ movies }) )(ProfileView);
