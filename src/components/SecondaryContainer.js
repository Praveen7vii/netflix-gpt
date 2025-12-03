import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    movies.nowPlayingMovies && (
    <div className='bg-black'>
      <div className='relative z-20 mt-0 md:-mt-45  pl-4 md:pl-12 px-4 md:px-8 pb-10 space-y-10'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Popular"} movies={movies.popularMovies}/>  
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
        <MovieList title={"Upcoming"} movies={movies.upcomingMovies}/>
      </div>
      </div>
    )
   
  )
}

export default SecondaryContainer