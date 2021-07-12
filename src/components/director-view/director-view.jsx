import React from 'react';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';

function DirectorView(props) {
  const { movies, directorName, onBackClick } = props;
  if (!movies || !movies.length) return null;
  const director = movies.find(m => m.Director.Name == directorName).Director
  console.log(director);
  return (
    <div className="movie-view">
      <h5>{director.Name}</h5>
      <div>{director.Description}</div>
      <div>{director.Birth}</div>
      <div>{director.Death}</div><br />
      <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>
    </div>
  );
}

export default connect(({movies}) => ({movies}))(DirectorView);