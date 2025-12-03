import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS,TMDB_API_KEY } from "../utils/Constants";
import { addUpcomingMovies } from "../utils/MovieSlice";

const useUpcomingMovies = () => {
//  custom hooks are just functions
// Fetch data from TMDB API and update store 
  const dispatch =  useDispatch();

    const popularMovies = useSelector(store => store.movies.popularMovies);


  const getUpcomingMovies = async () => {
  const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      API_OPTIONS
  );
  const json = await data.json();
  dispatch( addUpcomingMovies(json.results));
};

useEffect(()=>{
 !popularMovies && getUpcomingMovies();
},[])


}

export default useUpcomingMovies;