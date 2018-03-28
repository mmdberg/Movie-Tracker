import React from 'react';
import './styles.css';

export const Card = ({title, releaseDate, overview, posterPath, voteAverage}) => {
  console.log(title)
  return (
    <article>
      <h1>{title}</h1>

    </article>
  );
};