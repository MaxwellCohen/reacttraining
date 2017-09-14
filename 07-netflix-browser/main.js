import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import debounce from 'lodash.debounce';
import css from './main.css';
import movies from 'netflix-movie-rating-data/output/movies';

// An array of movies on Netflix.
console.log(movies);

// EXERCISE:
//
// 1. Render a list of movies so users can browse what's on Netflix.
// Maybe include the IMDB rating so folks can avoid bad movies.
//
// 2. Add a filter to browse titles in a specific genre.
//
// 3. Add a filter to browse titles above a certain rating.

class App extends Component {
  constructor() {
    super();
    this.state = {
      genreFilter: ''
    };
    this.test('a');
    this.setSciFifitler = this.setSciFifitler.bind(this);
    this.setGenreFilter = debounce(this.setGenreFilter, 200).bind(this);
  }

  setSciFifitler() {
    console.log('click');
    this.setGenreFilter('Sci-Fi')
  } 


  setGenreFilter(type) {
    this.setState((prevState) => {
      let gen = prevState.genreFilter;
      type = type + '|'
      if(!gen.includes(type)) {
        gen = gen + type;
      } else {
        gen = gen.replace(type, '')
      }
      var newState = Object.assign({}, prevState, {genreFilter:gen})
      return newState;
    })
  }

  render() {
    let gf = this.state.genreFilter.split('|');
    let displayedMovies = movies.filter((m) => {
      let shouldShow = true
      if (gf[0]) {
        for (let i = 0; i < gf.length; i++) {
          if (gf[i]) {
            shouldShow = m.genre.includes(gf[i]);
            break;
          }
        }
      } 
      return shouldShow
    })
    return (
      <div className="App">
        <h1>What&#39;s on Netflix?</h1>
        <div>
        <button onClick={this.setSciFifitler}>Sci-Fi</button>
        </div>
        <ul >
          {displayedMovies.map((movie) => <li key={`title-${movie.title}${movie.rating}`}>{movie.rating} -- {movie.title} -- {movie.genre}</li>)}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
