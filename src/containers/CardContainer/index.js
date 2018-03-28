import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import { Card } from '../../components/Card';

export const CardContainer = ({movies}) => {
  const moviesList = movies.map(movie => <Card {...movie} key={movie.id}/>);
  return (
    <div className="card-container">
      {moviesList}
    </div>
  );
};

export const mapStateToProps = state => ({
  movies: state.movies
});

CardContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired
  }))
};

export default connect(mapStateToProps)(CardContainer);