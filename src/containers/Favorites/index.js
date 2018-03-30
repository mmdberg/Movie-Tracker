import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import { Card } from '../../components/Card';
import * as actions from '../../actions/';

export const Favorites = ({ favorites, addFavorite }) => {
  const favoritesList = favorites.map(movie => 
    <Card information={movie} addFavorite={addFavorite} key={movie.id}/>
  );
  
  return (
    <div className='favorites-container'>
      {favoritesList}
    </div>
  );
};

export const mapStateToProps = state => ({
  favorites: state.favorites
});

export const mapDispatchToProps = dispatch => ({
  addFavorite: movie => dispatch(actions.addFavorite(movie))
});

export default connect(mapStateToProps)(Favorites);

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
  addFavorite: PropTypes.func.isRequired
};