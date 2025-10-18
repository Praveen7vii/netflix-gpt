import React from 'react'
import { IMG_CDN_URL } from '../utils/Constants'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48'>
        <img alt='Movie card'
        src={IMG_CDN_URL+posterPath}
        />
    </div>
  )
}

export default MovieCard