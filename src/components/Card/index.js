import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Card = ({ information, handleFavorite, logStatus, className }) => {
  const { title, releaseDate, overview, posterPath, voteAverage } = information;
  const backgroundImage = `url(https://image.tmdb.org/t/p/w500/${posterPath})`;
  const cleanYear = releaseDate.split('').splice(0, 5).splice(0, 4).join('')
  const cleanDate = [releaseDate, '-', cleanYear].join('').split('').splice(5).join('')
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
      <div className='gradient'>
        <h3 className="movie-title">{title}</h3>
        <button className="favorite-btn" onClick={handleClick}>Favorite <img src="{}" alt=""/></button>
        <div className="movie-info-shadow">
          <p className="info">Released: {cleanDate}</p>
          <p className="info">Rating: {voteAverage}</p>
        </div>
          <p className="movie-overview">{overview}</p>
      </div>
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
