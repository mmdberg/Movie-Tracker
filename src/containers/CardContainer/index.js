import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import { Card } from '../../components/Card';
import * as actions from '../../actions/';
import * as api from '../../apiCalls'

export const CardContainer = ({ movies, addFavorite, logStatus, user }) => {
  
  const handleFavorite = async (movie) => {
    addFavorite(movie);
    const response = await api.addFavorite(movie, user);
    const movieId = response.id;
    console.log(movieId)
  };

  const moviesList = movies.map(movie => 
    <Card 
      information={movie} 
      addFavorite={handleFavorite} 
      logStatus={logStatus} 
      key={movie.id} 
    />
  );
  
  return (
    <div className="card-container">
      { moviesList }
    </div>
  );
};

export const mapStateToProps = state => ({
  movies: state.movies,
  logStatus: state.logStatus,
  user: state.user
});

export const mapDispatchToState = dispatch => ({
  addFavorite: movie => dispatch(actions.addFavorite(movie))
});

export default connect(mapStateToProps, mapDispatchToState)(CardContainer);

CardContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired
  })),
  addFavorite: PropTypes.func.isRequired,
  logStatus: PropTypes.bool.isRequired
};