import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Card = ({ information, handleFavorite, logStatus, className }) => {
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
      className={className}>
      <h3 className="movie-title">{title}</h3>
      <button className="favorite-btn" onClick={handleClick}>Favorite</button>
      <p className="info">Released: {releaseDate}</p>
      <p className="info">Rating: {voteAverage}</p>
      <p className="movie-overview">{overview}</p>
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
    ])
  }),
  handleFavorite: PropTypes.func.isRequired,
  logStatus: PropTypes.bool.isRequired,
  className: PropTypes.string
};
