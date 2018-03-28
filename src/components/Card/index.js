import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Card = (
  {title, releaseDate, overview, posterPath, voteAverage}
) => {
  const backgroundImage = `url(https://image.tmdb.org/t/p/w500/${posterPath})`;
  return (
    <article style={{backgroundImage}} className="movie-card">
      <h3>{title}</h3>
      <p>Released: {releaseDate}</p>
      <p>Rating: {voteAverage}</p>
      <p>{overview}</p>
    </article>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired
};