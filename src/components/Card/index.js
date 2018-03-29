import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Card = ({information, addFavorite}) => {
  const { title, releaseDate, overview, posterPath, voteAverage } = information;
  const backgroundImage = `url(https://image.tmdb.org/t/p/w500/${posterPath})`;


  return (
    <article 
      style={{backgroundImage}} 
      onClick={() => addFavorite(information)} 
      className="movie-card">
      <h3>{title}</h3>
      <p>Released: {releaseDate}</p>
      <p>Rating: {voteAverage}</p>
      <p>{overview}</p>
    </article>
  );
};

Card.propTypes = {
  information: PropTypes.shape({
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired
  }),
  addFavorite: PropTypes.func.isRequired
};
