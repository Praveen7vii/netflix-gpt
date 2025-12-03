import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import {auth} from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/UserSlice';
import {onAuthStateChanged } from "firebase/auth";
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/Constants';
import { toggleGptSearchView } from '../utils/GptSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        navigate("/error");
      });
  }

  const handleGPTSearchClick = () => {
    //  Toggle GPT Search
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const {uid, email, displayName, photoURL} = user;
      dispatch(
        addUser({
          uid:uid,
          email:email,
          displayName:displayName, 
          photoURL:photoURL,
        }));
        navigate("/browse");
      } else {
      // User is signed out
      dispatch(removeUser());
        navigate("/");
    }
    }); 

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  },[])


  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10  flex flex-col md:flex-row md:justify-between '>
        <img 
        className='w-44 mx-auto md:mx-0'
        src={LOGO}
        alt = "logo"
        />

     {user && (
        <div className='flex p-2 justify-between'>
        { showGptSearch &&   (
        <select className='p-2 bg-gray-900 text-white' 
          onChange={handleLanguageChange}>
            {
              SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
              </option>
              ))
            }
          </select>
        )}
          <button className='py-2 px-2 mx-4 my-2 bg-purple-700 text-white rounded-lg'
          onClick={handleGPTSearchClick}>
          {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img
          className='hidden md:block w-12 h-12'
          alt='usericon'
          src={user?.photoURL}
          />
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>
      )}  
    </div>
  )
}

export default Header