import React from 'react';
import './styles.css';
import { connect } from 'react-redux';
import { Card } from '../../components/Card'

export const CardContainer = ({movies}) => {
  const moviesList = movies.map(movie => <Card {...movie} key={movie.id}/>);

  return (
    <div>
      {moviesList}
    </div>
  );

};

export const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(CardContainer);