import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { movies, visibilityFilter, sortColumn } = state;

    let moviesDisplay = movies.concat().sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return -1;
        if (a[sortColumn] > b[sortColumn]) return 1;
        return 0;
    });

    if (visibilityFilter !== '') {
        moviesDisplay = moviesDisplay.filter(m => m.Title.toLowerCase().includes(visibilityFilter));
    }

    return { movies: moviesDisplay };
};

function MoviesList(props) {
    const { movies, userData } = props;
    console.log(movies, 'movies-list');
    console.log(userData, 'userData');
    const favMovies = userData.FavoriteMovies || [];
  
    if (!movies) return <div className="main-view"/>;
  
    return <div className="movies-list">
      <VisibilityFilterInput/>
      <Container>
        <Row>
          {
            movies.map(m =>
              (<Col key={m._id}>
                <MovieCard
                  key={m._id}
                  movie={m}
                  favorite={favMovies.indexOf(m._id) > -1}
                  addToFavorites={props.addToFavorites}
                  removeFromFavorites={props.removeFromFavorites}
                />
              </Col>)
            )
          }
        </Row>
      </Container>
    </div>;
  
}

export default connect(mapStateToProps)(MoviesList);