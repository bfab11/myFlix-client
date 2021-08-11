import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import NavBar from '../navbar/navbar.jsx';
import ProfileUpdate from '../profile-view/profile-update';
import ProfileView from '../profile-view/profile-view';

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            user: null,
            selectedMovie: null,
            email: '',
            birthday: '',
            token: '',
            userData: {}
        };

        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this)
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.props.setUser(localStorage.getItem('user'));
            this.getMovies(accessToken);
            this.getUser(localStorage.getItem("user"), accessToken);
          }
    }

    updateUser(data) {
        this.setState({
            userData: data
        });
        localStorage.setItem('user', data.Username);
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

    getMovies(token) {
        axios.get('https://myflixdbapp.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.props.setMovies(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getUser(user, token) {
        axios.get(`https://myflixdbapp.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            this.props.setUser(response.data)
            this.setState({
                email: response.data.Email,
                birthday: response.data.Birthday,
                token: token,
                userData: response.data
            });
            console.log('Success with getting user');
        })
        .catch(error => {
            console.log(error);
        });
    }

    addToFavorites(movie) {
        let favorites = this.state.userData.FavoriteMovies;
        if (favorites.indexOf(movie) < 0) {
          favorites.push(movie);
        }
    
        let userData = {...this.state.userData};
        userData.FavoriteMovies = favorites;
        this.setState({userData});
    }
    
    removeFromFavorites(movieId) {
        let currFavorites = this.state.userData.FavoriteMovies;
        let favorites = currFavorites.filter(mId => {
          return mId !== movieId
        });
        let userData = {...this.state.userData};
        userData.FavoriteMovies = favorites;
        this.setState({userData});
    }

    onLoggedIn(authData) {
        console.log(authData, 'authData');
        this.props.setUser(authData.user.Username);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.setState({
            userData: authData.user
        });
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
        const { token, userData } = this.state;
        const { user, movies } = this.props;
        console.log(movies, 'movies');
        console.log(user, 'user');

        return (
            <Router>
          <div className="main-view justify-content-center">

            <Route exact path="/" render={({ history }) => {
              console.log('something');
              if (!user){
                console.log('2');
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              } 
              if (movies.length === 0) return <div className="main-view" />;
              return (
              <Container>
                <Row>
                  <Col className="p-0">
                    <NavBar user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                  </Col>
                </Row>
                <div className="d-flex flex-wrap justify-content-center">
                    <MoviesList 
                    addToFavorites={this.addToFavorites}
                    removeFromFavorites={this.removeFromFavorites}
                    userData={userData} 
                    user={user} 
                    token={token} />
                </div>
              </Container>
              );
            }} />

            <Route exact path="/movies"
                render={() =>  
                <Container> 
                  <Row>
                    <Col className="p-0">
                      <NavBar user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                    </Col>
                  </Row>
                  <div className="d-flex flex-wrap justify-content-center">
                    <MoviesList
                      addToFavorites={this.addToFavorites}
                      removeFromFavorites={this.removeFromFavorites}
                      userData={user}
                /></div>
                </Container> }/>

            <Route exact path="/register" render={() => {
              if (user) return <Redirect to="/" />;
              return <RegistrationView />
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Container>
                  <Row>
                    <Col className="p-0">
                      <NavBar user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col sm={12} md={10} lg={8}>
                      <MovieView 
                        movieId={match.params.movieId} 
                        onBackClick={() => history.goBack()} />
                    </Col>
                  </Row>
              </Container>
              );
            }} />

            <Route path="/genres/:name" render={ ({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Container>
                  <Row>
                    <Col className="p-0">
                      <NavBar user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col md={10}>
                      <GenreView 
                        genreName={match.params.name}
                        movies={movies}
                        onBackClick={() => history.goBack()} />
                    </Col>
                  </Row>
              </Container>
              );
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Container>
                  <Row>
                    <Col className="p-0">
                      <NavBar user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col md={10}>
                      {/* find directors name from the database */}
                      <DirectorView 
                      directorName={match.params.name}
                      history={history}
                      movies={movies}
                      onBackClick={() => history.goBack()} />
                    </Col>
                  </Row>  
                </Container>
              );
            }} />
          
            <Route path="/users/:Username" render={({ history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (movies.length === 0) return <div className="main-view" />;
              return ( 
                <Container>
                  <Row>
                    <Col className="p-0">
                      <NavBar user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col md={10}>
                      <ProfileView 
                      userData={user}
                      onBackClick={() => history.goBack()} />
                    </Col>
                  </Row> 
                  <Row className="d-flex justify-content-center">
                  <Col md={10}>
                    <FavoritesView user={user} movies={movies} />
                    </Col>  
                  </Row>
                </Container>
              );
            }} />

            <Route
              exact
              path="/profile/update"
              render={({ history }) => <Container>
              <Row>
                <Col className="p-0">
                  <NavBar userData={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col md={10}>
                  <ProfileUpdate 
                  userData={user}
                  onBackClick={() => history.goBack()} />
                </Col>
              </Row> 
              {/* <Row className="d-flex justify-content-center">
              <Col md={10}>
                <FavoritesView userData={user} movies={movies} />
                </Col>  
              </Row> */}
            </Container>}
            />
            <Route
              exact
              path="/profile"
              render={({ history }) => <Container>
              <Row>
                <Col className="p-0">
                  <NavBar user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col md={10}>
                  <ProfileView 
                  userData={user}
                  onBackClick={() => history.goBack()} />
                </Col>
              </Row>
            </Container>}
            />

          </div>
        </Router>
        );
      }
    }

let mapStateToProps = state => {
    return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);