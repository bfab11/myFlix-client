import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { connect } from 'react-redux';

export default function MovieView(props) {
  const { movies, movieId } = props;
  if (!movies || !movies.length) return null;
  const movie = movies.find(m => m._id == movieId);
  console.log('success with movie-view');

  return (
    <Container>
      <Row className="movie-view">
        <Col>
          <Card>
            <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/" + movie.ImagePath} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <div className="label h6">Director</div>
              <div className="movie-director">{movie.Director.Name}</div><br />
              <div className="label h5">Learn More</div>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="outline-dark">Director</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="outline-dark">Genre</Button>
              </Link>
              <Link to={'/'}>
                <Button className="back-btn" variant="outline-dark" type="button">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(({movies}) => ({movies}))(MovieView);