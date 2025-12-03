import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS,TMDB_API_KEY } from "../utils/Constants";
import { addTopRatedMovies } from "../utils/MovieSlice";

const useTopRatedMovies = () => {
//  custom hooks are just functions
// Fetch data from TMDB API and update store 
  const dispatch =  useDispatch();

  const topRatedMovies = useSelector(store => store.movies.topRatedMovies);


  const getTopRatedMovies = async () => {
  const data = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&page=1`,
    API_OPTIONS
  );
  const json = await data.json();
  dispatch(addTopRatedMovies(json.results));
};

useEffect(()=>{
  !topRatedMovies && getTopRatedMovies();
},[])


}

export default useTopRatedMovies;