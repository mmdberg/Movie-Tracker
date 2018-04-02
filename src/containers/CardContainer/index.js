import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
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
      api.addFavorite(movie, user);
      addFavorite(movie);
    }
  };

  const cardsCreator = sourceArray => sourceArray.map(movie => {
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

export const mapStateToProps = ({movies, logStatus, user, favorites}) => 
  ({ movies, logStatus, user, favorites });

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
