import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

export class MovieCard extends React.Component {
    render() {
        console.log(this.props, "!props");
        const { movie, onMovieClick } = this.props;
        return (
            <CardDeck>
                <Card border="dark" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => onMovieClick(movie)} variant="outline-dark">Open</Button>
                    </Card.Footer>
                </Card>
            </CardDeck>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
        }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};