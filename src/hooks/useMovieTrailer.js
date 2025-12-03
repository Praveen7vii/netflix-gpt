import {API_OPTIONS} from '../utils/Constants'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/MovieSlice';

const useMovieTrailer=(movieId)=>{
    const dispatch = useDispatch();
      const movieTrailer = useSelector(store => store.movies.trailerVideo);

// fetch trailer video && updating the store with trailer video data
  const getMovieVideos = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', 
    API_OPTIONS); 
    const json = await data.json();

      const filterData = json.results.filter((video) => video.type==="Trailer")
      const trailer = filterData.length ? filterData[0] : json.results[0]; 
      dispatch(addTrailerVideo(trailer))
    
    };

  useEffect(()=>{
   !movieTrailer && getMovieVideos();
  },[])

}
 
export default useMovieTrailer;