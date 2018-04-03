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
    hideMovieInfoById,
    logStatus, 
    match, 
    favorites, 
    user, 
    infoIds }
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
    if (infoIds.includes(movieId)) {
      hideMovieInfoById(movieId);
    } else {
      showMovieInfoById(movieId);
    }
  };

  const cardsCreator = sourceArray => sourceArray.map(movie => {
    let favBtnClass = user ? '' : 'favsHidden';
    const favClass = sourceArray === favorites ? 'favorite' : '';
    const infoDisplayed = infoIds.includes(movie.movieId) ? "displayInfo" : '';
    return <Card
      information={movie}
      handleFavorite={handleFavorite}
      logStatus={logStatus}
      key={movie.movieId}
      favBtnClass={favBtnClass}
      isFavorited={favClass}
      infoDisplayed={infoDisplayed}
      handleInfoDisplay={handleInfoDisplay}
    />;
  });

  const { path } = match;
  const determineMoviesListByPath = () => {
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
  {movies, logStatus, user, favorites, infoIds}
) => 
  ({ movies, logStatus, user, favorites, infoIds });

export const mapDispatchToProps = dispatch => ({
  addFavorite: movie => dispatch(actions.addFavorite(movie)),
  removeFavorite: movie => dispatch(actions.removeFavorite(movie.movieId)),
  showMovieInfoById: movieId => dispatch(actions.showMovieInfoById(movieId)),
  hideMovieInfoById: movieId => dispatch(actions.hideMovieInfoById(movieId))
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
  infoIds: PropTypes.array.isRequired,
  showMovieInfoById: PropTypes.func.isRequired,
  hideMovieInfoById: PropTypes.func.isRequired
};