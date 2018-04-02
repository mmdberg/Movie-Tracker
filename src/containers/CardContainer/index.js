import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import { Card } from '../../components/Card';
import * as actions from '../../actions/';
import * as api from '../../apiCalls';

export const CardContainer = (
  { movies, addFavorite, removeFavorite, logStatus, match, favorites, user }
) => {

  const { path } = match;
  
  const handleFavorite = movie => {
    const alreadyFavorited = favorites.some(fav => 
      fav.movieId === movie.movieId);
    
    if (alreadyFavorited) {
      api.removeFavorite(movie, user);
      removeFavorite(movie); 
    } else {
      addFavorite(movie);
      api.addFavorite(movie, user);
    }
  };

  const cardsCreator = source => source.map(movie => {
    var cardStyle = 'movie-card';
    favorites.forEach(favorite => {
      if (movie.title === favorite.title) {
        cardStyle = 'favorite movie-card';
      }
    });
    
    return <Card
      information={movie}
      handleFavorite={handleFavorite}
      logStatus={logStatus}
      key={movie.movieId}
      className={cardStyle}
    />;
  });

  const determineMoviesListByPath = () => {
    if (path === "/favorites") {
      if (favorites.length === 0) {
        return <p className='no-favorites'>You have no favorites saved</p>;
      } else {
        return cardsCreator(favorites);
      }
    } else {
      return cardsCreator(movies);
    }
  };

  return (
    <div className="card-container">
      { determineMoviesListByPath() }
    </div>
  );
};

export const mapStateToProps = state => ({
  movies: state.movies,
  logStatus: state.logStatus,
  user: state.user,
  favorites: state.favorites
});

export const mapDispatchToProps = dispatch => ({
  addFavorite: movie => dispatch(actions.addFavorite(movie)),
  removeFavorite: movie => dispatch(actions.removeFavorite(movie.movieId))
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
  user: PropTypes.object.isRequired
};
