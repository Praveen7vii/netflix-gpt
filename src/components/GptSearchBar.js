import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import Gemini from '../utils/Gemini'
import { TMDB_API_KEY,API_OPTIONS } from '../utils/Constants'
import { addGptMovieResult } from '../utils/GptSlice'

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector(store => store.config.lang)
    const searchText = useRef(null);

    //  Search movie in TMBD 
 const searchMovieTMDB = async (movie) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
    API_OPTIONS
  );
  const json = await data.json();
  return json.results;
};


    // const handleGptSearchClick = async () => {
    //     console.log(searchText.current.value);
    //     //  Make an API call to gemini API and get movie results

    //     const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query: "+
    //     searchText.current.value+ 
    //     "only give me names of 5 movies, comma separated like example result given ahead. Example Result: Gadar, Sholay, Kantara, Golmal, Koi mil gaya ";       

    //     const gptResults =  await Gemini.getGenerativeModel({
    //         model: "gemini-2.5-flash",
    //         contents: gptQuery,
    //     });
    //     console.log(gptResults.text);

    //  dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
    //     // const model = Gemini.getGenerativeModel({ model: "gemini-2.5-flash" });
    //     // const result = await model.generateContent(gptQuery);
    //     // const response = await result.response;
    //     // const gptResults = response.text();

    //     const gptMovies = gptResults.text.split(",").map(m => m.trim());
    //     // the result will become an array by using split()
    //     // for each movie i will search TMBD API
    //     const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie))
    //     // this will return the promise array because bcz searchMovieTMBD is async function [Promise, Promise, Promise, Promise, Promise]

    //     const tmdbResults = await Promise.all(promiseArray);
    //     console.log(tmdbResults);
    //     dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));  
    // };

const handleGptSearchClick = async () => {
  const query = searchText.current.value;

  const gptQuery =
    "Act as a Movie Recommendation system and suggest some movies for the query: " +
    query +
    ". Only give me names of 5 movies, comma separated like example: Gadar, Sholay, Kantara, Golmal, Koi mil gaya.";

  // 1. Get the model
  const model = Gemini.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  // 2. Generate response
  const result = await model.generateContent(gptQuery);

  // 3. Extract text
  const gptText = result.response.text();
  console.log("GPT Text:", gptText);

  // 4. Convert to array
  const gptMovies = gptText.split(",").map((m) => m.trim());

  // 5. Search each movie on TMDB  
  const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
  const tmdbResults = await Promise.all(promiseArray);

  console.log("TMDB Results:", tmdbResults);

  // 6. Update the Redux store  
  dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
};

    return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input
            ref={searchText}
            type='text'
             className='p-4 m-4 col-span-9' 
             placeholder={lang[langKey].gptSearchPlaceholder}
             />
            <button className='col-span-3 py-2 px-2 m-4 bg-red-700 text-white rounded-lg'
            onClick={handleGptSearchClick}>
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar