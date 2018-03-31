import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Card = ({ information, handleFavorite, logStatus }) => {
  const { title, releaseDate, overview, posterPath, voteAverage } = information;
  const backgroundImage = `url(https://image.tmdb.org/t/p/w500/${posterPath})`;
  const handleClick = () => {
    if (logStatus) {
      handleFavorite(information);
    } else {
      alert('Please Log In to Add A Favorite');
    }
  };

  return (
    <article
      style={{backgroundImage}}
      className="movie-card">
      <h3>{title}</h3>
      <p>Released: {releaseDate}</p>
      <p>Rating: {voteAverage}</p>
      <p>{overview}</p>
      <button onClick={handleClick}>Favorite</button>
    </article>
  );
};

Card.propTypes = {
  information: PropTypes.shape({
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    voteAverage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }),
  handleFavorite: PropTypes.func.isRequired,
  logStatus: PropTypes.bool.isRequired
};
