import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import star from './star.svg';

export const Card = (
  { information, 
    handleFavorite, 
    logStatus, 
    isFavorited, 
    displayInfo, 
    handleInfoDisplay,
    favBtnClass }
) => {
  const { 
    movieId, 
    title, 
    releaseDate, 
    overview, 
    posterPath, 
    voteAverage } = information;
  const backgroundImage = `url(https://image.tmdb.org/t/p/w500/${posterPath})`;
  const cleanYear = releaseDate.split('').splice(0, 5).splice(0, 4).join('');
  const cleanDate = [releaseDate, '-', cleanYear]
    .join('').split('').splice(5).join('');
  const favStarSrc = isFavorited.includes('favorite') ? star : '';
  const favText = isFavorited.includes('favorite') ? 
    "REMOVE FAVORITE" : "FAVORITE";

  const handleFavBtnClick = () => {
    if (logStatus) {
      handleFavorite(information);
    } else {
      alert('Please Log In to Add A Favorite');
    }
  };

  const handleCardClick = event => {
    if (event.target.name !== 'favoriteBtn') {
      handleInfoDisplay(movieId);
    }
  };
  
  return (
    <article
      style={{backgroundImage}}
      className={`movie-card ${isFavorited} ${displayInfo}`}
      onClick={event => handleCardClick(event)}>
      <button 
        name="favoriteBtn"
        className={`favorite-btn ${favBtnClass}`} 
        onClick={() => handleFavBtnClick()}>
        {favText}
        <img src={favStarSrc} alt=""/>
      </button>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="info">Released: {cleanDate}</p>
        <p className="info">Rating: {voteAverage}</p>
        <p className="info">{overview}</p>
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
  className: PropTypes.string,
  isFavorited: PropTypes.string,
  displayInfo: PropTypes.string.isRequired,
  handleInfoDisplay: PropTypes.func.isRequired,
  favBtnClass: PropTypes.string.isRequired
};
