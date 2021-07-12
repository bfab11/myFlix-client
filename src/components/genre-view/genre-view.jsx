import React from 'react';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';

function GenreView(props) {
  const { movies, genreName, onBackClick } = props;
  if (!movies || !movies.length) return null;
  const genre = movies.find(m => m.Genre.Name == genreName).Genre
  console.log(genre);
  return (
    <div className="movie-view">
      <h5>{genre.Name}</h5>
      <div>{genre.Description}</div><br />
      <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>
    </div>
  );
}

export default connect(({movies}) => ({movies}))(GenreView);