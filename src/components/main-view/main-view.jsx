import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import NavBar from '../navbar/navbar.jsx';
import ProfileUpdate from '../profile-view/profile-update';
import ProfileView from '../profile-view/profile-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie : null,
            user: null,
            userData: null
        }
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        let userToken = localStorage.getItem('user');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
                token: localStorage.getItem('token')
            });
            this.getAcc(accessToken, userToken);
            this.getMovies(accessToken);
        }
    }

    newUser(newData) {
        localStorage.setItem('user', newData.Username);
        this.setState({
            userData: newData,
            user: newData.Username
        });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    getAcc(token, user) {
        axios.get(`https://myflixdbapp.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            console.log('Success with getAcc');
            this.setState({
                userData: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getMovies(token) {
        axios.get('https://myflixdbapp.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      addToFavorites(movie) {
        let favorites = this.state.userData.FavoriteMovies;
        if (favorites.indexOf(movie) < 0) {
          favorites.push(movie);
        }
    
        let userData = {...this.state.userData};
        userInfo.FavoriteMovies = favorites;
        this.setState({userData});
      }
    
      removeFromFavorites(movieId) {
        let currFavorites = this.state.userData.FavoriteMovies;
        let favorites = currFavorites.filter(mId => {
          return mId !== movieId
        });
        let userData = {...this.state.userData};
        userData.FavoriteMovies = favorites;
        this.setState({userInfo});
      }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
            token: authData.token
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getAcc(authData.token, authData.user.Username);
        this.getMovies(authData.token);
    }

    signOut(signState) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
            token: null,
            userData: null
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
        const { movies, movieData, user, token, userData, movie } = this.state;

        return (
            <Router>
                <NavBar />
                <Row className="main-view justify-content-md-center">
                    <Route exact path={["/", "/movies"]} render={({ history }) => {
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        )
                        if (movies.length === 0) return ( 
                            
                                <div className="main-view" />
                            
                        );
                        if (userData) return (( movies.map(movie => (
                           
                                <Col md={3} key={movie._id}>
                                    <MovieCard movieData={movie} userData={userData} user={user} token={token} onGetAcc={() => { this.getAcc(token, user); }} />
                                </Col>
                            
                        ))
                        ))
                     }} />
                    <Route path="/register" render={() => <RegistrationView />} />
                    <Route
                        exact
                        path="/profile/update"
                        render={() => <ProfileUpdate userData={userData} user={user} token={token} updateUser={data => this.updateUser(data)} />}
                    />
                    <Route
                        exact
                        path="/profile"
                        render={() => <ProfileView userData={userData} />}
                    />
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        return (
                            
                                <Col md={8}>
                                    <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack() } />
                                </Col>
                            
                        )
                    }} />
                </Row>

                <Row className="director-view justify-content-md-center">
                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (movies.length === 0) return (
                        <div className="main-view" />
                        );
                        return (
                            <Col md={8}>
                                <DirectorView directorData={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack() } />
                            </Col>
                        )
                    }} />
                </Row>

                <Row className="genre-view justify-content-md-center">
                    <Route path="/genre/:name" render={({ match, history }) => {
                        if (movies.length === 0) return (
                        <div className="main-view" />
                        );
                        return (
                            <Col md={8}>
                                <GenreView genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack() } />
                            </Col>
                        )
                    }} />
                </Row>
                
            </Router>
        );

        







        // // if (register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleRegister={this.toggleRegister} />; 

        // if (this.state.user === null) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />; 
        
        // if (movies.length === 0) return <div className = "main-view">The list is empty!</div>;
        //     return (
        //         <Row className="main-view justify-content-md-center">
        //             {selectedMovie 
        //                 ? (
        //                     <Col md={8}>
        //                         <MovieView movie= {selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }}/>
        //                     </Col>
        //                 )
        //                 : movies.map(movie => (
        //                     <Col md={3}>
        //                         <MovieCard key={movie._id} brandon = {12} movie = {movie}  onMovieClick = {newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }} />
        //                     </Col>
        //                 ))
        //             }
        //         </Row>
        //     );
        }
    }

export default MainView;