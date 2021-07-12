import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import axios from "axios";

import { Link } from "react-router-dom";

let toggleClick = false;

export class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fav: props.favorite
        };
    
        this.toggleClass = this.toggleClass.bind(this);
      }
    
      componentDidUpdate(prevProps) {
        if (this.props.favorite !== prevProps.favorite) {
          this.setState({
            fav: this.props.favorite
          })
        }
      }
    
      removeFromFavorites() {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const movieId = this.props.movie_id
        axios
            .delete(`https://myflixdbapp.herokuapp.com/users/${user}/Favorites/${movieId}`,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )
            .then(response => {
              console.log(response);
              this.setState({
                fav: false
              });
              this.props.removeFromFavorites(movieId);
    
            })
            .catch(e => {
              console.log(e);
            });
      }
    
      addToFavorites(movieId) {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token')
        axios
        .post(`https://myflixdbapp.herokuapp.com/users/${user}/Favorites/${movieId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then(response => {
          console.log(response);
          this.setState({
            fav: true
          });
          this.props.addToFavorites(movieId);
        })
        .catch(e => {
          console.log(e);
        });
      }
    
      toggleClass() {
        toggleClick = true;
        if (!this.state.fav) {
          this.addToFavorites(this.props.movie_id);
        } else {
          this.removeFromFavorites();
        }
    
      }

    render() {
        const { movie } = this.props;
        console.log(movie, 'movie state');
        return (
            <CardDeck>
                <Card border="dark" style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src={movie.ImagePath} /> */}
                    <Card.Body>
                        <Card.Title>
                            {movie.Title}
                        </Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                            <Button
                                onClick={() => this.toggleClass()}
                                className={this.state.fav ? "fave active" : "fave"}

                            >
                                &#x2605;
                            </Button>
                        <Link to={`/movies/${movie._id}`}>
                            <Button variant="outline-dark">Open</Button>
                        </Link>
                    </Card.Footer>
                </Card>
            </CardDeck>
        );
    }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};