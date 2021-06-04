import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie : null,
            user: null
        }
    }

    componentDidMount(){
        axios.get('https://myflixdbapp.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie:newSelectedMovie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    onBackClick() {
        this.setState({
            selectedMovie: null
        });
    }

    toggleRegister = (e) => {
        e.preventDefault();
        this.setState({
            register: !this.state.register
        })
    }

    render() {
        const { movies, selectedMovie, register } = this.state;
        if (register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleRegister={this.toggleRegister} />;
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if (movies.length === 0) return <div className = "main-view">The list is empty!</div>;
            return (
                <div className="main-view">
                    {selectedMovie ? <MovieView movie= {selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}}/>
                    : movies.map(movie=> <MovieCard key={movie._id} movieData = {movie}  onMovieClick = {(movie) =>{this.setSelectedMovie(movie)}} />)}
                </div>
            );
        }
    }
