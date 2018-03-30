import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import { Card } from '../../components/Card';
import * as actions from '../../actions/';

export const CardContainer = ({ movies, addFavorite, logStatus }) => {
  const moviesList = movies.map(movie => 
    <Card 
      information={movie} 
      addFavorite={addFavorite} 
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
  logStatus: state.logStatus
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