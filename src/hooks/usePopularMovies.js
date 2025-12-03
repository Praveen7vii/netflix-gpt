import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS, TMDB_API_KEY } from "../utils/Constants";
import { addPopularMovies } from "../utils/MovieSlice";

const usePopularMovies = () => {
//  custom hooks are just functions
// Fetch data from TMDB API and update store 
  const dispatch =  useDispatch();

  const popularMovies = useSelector(store => store.movies.popularMovies);


  const getPopularMovies = async () => {
  const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=1`,
    API_OPTIONS
  );
  const json = await data.json();
  dispatch(addPopularMovies(json.results));
};

useEffect(()=>{
 !popularMovies && getPopularMovies();
},[])


}

export default usePopularMovies;