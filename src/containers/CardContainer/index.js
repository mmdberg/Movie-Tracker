import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import './styles.css';
import { connect } from 'react-redux';
import { Card } from '../../components/Card';
import * as actions from '../../actions/';
import * as api from '../../apiCalls';

export const CardContainer = (
  { movies,
    addFavorite, 
    removeFavorite,
    showMovieInfoById,
    hideMovieInfo,
    logStatus, 
    match, 
    favorites, 
    user, 
    displayedMovie }
) => {

  const handleFavorite = movie => {
    const alreadyFavorited = favorites.some(fav =>
      fav.movieId === movie.movieId);

    if (alreadyFavorited) {
      api.removeFavorite(movie, user);
      removeFavorite(movie);
    } else {
      api.addFavorite(movie, user);
      addFavorite(movie);
    }
  };

  const handleInfoDisplay = movieId => {
    if (displayedMovie === movieId) {
      hideMovieInfo(movieId);
    } else {
      showMovieInfoById(movieId);
    }
  };

  const cardsCreator = sourceArray => sourceArray.map(movie => {
    let favBtnClass = user ? '' : 'favsHidden';
    const favClass = sourceArray === favorites ? 'favorite' : '';
    const displayInfo = displayedMovie === movie.movieId ? "displayInfo" : '';
    return <Card
      information={movie}
      handleFavorite={handleFavorite}
      logStatus={logStatus}
      key={movie.movieId}
      favBtnClass={favBtnClass}
      isFavorited={favClass}
      displayInfo={displayInfo}
      handleInfoDisplay={handleInfoDisplay}
    />;
  });

  const determineMoviesListByPath = () => {
    const { path } = match;
    if (path === "/favorites") {
      if (!user) {
        return <Redirect to='/' />;
      }
      if (!favorites.length) {
        return <p className='no-favorites'>You have no favorites saved</p>;
      }
      return cardsCreator(favorites);
    }
    return cardsCreator(movies);
  };

  return (
    <div className="card-container">
      { determineMoviesListByPath() }
    </div>
  );
};

export const mapStateToProps = (
  {movies, logStatus, user, favorites, displayedMovie}
) => 
  ({ movies, logStatus, user, favorites, displayedMovie });

export const mapDispatchToProps = dispatch => ({
  addFavorite: movie => dispatch(actions.addFavorite(movie)),
  removeFavorite: movie => dispatch(actions.removeFavorite(movie.movieId)),
  showMovieInfoById: movieId => dispatch(actions.showMovieInfoById(movieId)),
  hideMovieInfo: movieId => dispatch(actions.hideMovieInfo(movieId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);

CardContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired
  })),
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  logStatus: PropTypes.bool.isRequired,
  favorites: PropTypes.array.isRequired,
  match: PropTypes.object,
  user: PropTypes.object,
  displayedMovie: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  showMovieInfoById: PropTypes.func.isRequired,
  hideMovieInfo: PropTypes.func.isRequired
};