
import React from 'react';

export default function Moviecard({movie,selectMovie}) {
  const IMAGE_PATH="https://image.tmdb.org/t/p/w200/"
  
  return (
      <div className={"movie-card"} onClick={() => selectMovie(movie)}>
        {
          movie.poster_path ? <img  src={`${IMAGE_PATH}${movie.poster_path}`} alt=''/>
          :
          <div className='movie-placeholder'> NO Image Found </div>
        }
       <h5> {movie.title}</h5>
      </div>
  )
}
