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
            user: null,
            registerd: true
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

    changeReg(regStatus) {
        this.setState({
            registered: regStatus
        })
    }

    onBackClick() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        const { movies, selectedMovie, user, registered } = this.state;
        if (!user && registered) return <LoginView regData={Status => this.changeReg(Status)} loggingIn={user => this.onLoggedIn(user)} />; 

        if (!user && !registered) return <RegistrationView  regData={Status => this.changeReg(Status)}/>; 
        
        if (movies.length === 0) return <div className = "main-view">The list is empty!</div>;
            return (
                <div className="main-view">
                    {selectedMovie ? <MovieView movie= {selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}}/>
                    : movies.map(movie=> <MovieCard key={movie._id} movieData = {movie}  onMovieClick = {(movie) =>{this.setSelectedMovie(movie)}} />)}
                </div>
            );
        }
    }
