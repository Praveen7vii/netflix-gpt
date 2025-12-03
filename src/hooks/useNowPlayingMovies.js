import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TMDB_API_KEY, API_OPTIONS } from "../utils/Constants";
import { addNowPlayingMovies } from "../utils/MovieSlice";

const useNowPlayingMovies = () => {
//  custom hooks are just functions
// Fetch data from TMDB API and update store 
  const dispatch =  useDispatch();

  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {

  const data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&page=1`,
    API_OPTIONS
  );
  const json = await data.json();
  dispatch(addNowPlayingMovies(json.results));
};

useEffect(()=>{
 !nowPlayingMovies && getNowPlayingMovies();
},[])


}

export default useNowPlayingMovies;