import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  render() {
    const { movieData } = this.props;

    return (

      <div className="movie-view">
        <div className="movie-poster">
          <img src={movieData.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movieData.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movieData.Description}</span>
        </div>
        <div>
        <Link to={`/directors/${movieData.Director.Name}`}>
          <Button variant="outline-dark">Director</Button>
        </Link>

        <Link to={`/genre/${movieData.Genre.Name}`}>
          <Button variant="outline-dark">Genre</Button>
        </Link>
        </div>
        <Link to={`/`}>
          <Button variant="outline-dark">Back</Button>
        </Link>
       </div>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired
    })
  }).isRequired
};