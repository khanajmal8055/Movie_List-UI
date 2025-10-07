import React from 'react'

const Movie = ({movie : {title , vote_average , original_language , poster_path , release_date , id}}) => {
  return (
    <div className='movie-card'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}  alt={title}/>

        <div className='mt-4'>
            <h3>{title}</h3>
            <div className='content'>
                <div className='rating'>
                    <img src="star.svg" alt="Star Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>•</span>
                <p className='text-white'>{original_language ? original_language.toUpperCase() : 'N/A'}</p>
                <span>•</span>
                <p className='year'>
                    {release_date ? release_date.split('-')[0] : 'N/A'}
                </p>
            </div>
        </div>

    </div>
  )
}

export default Movie