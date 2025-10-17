import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import {auth} from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/UserSlice';
import {onAuthStateChanged } from "firebase/auth";
import { LOGO } from '../utils/Constants';
const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        navigate("/error");
      });
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
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img 
        className='w-44'
        src={LOGO}
        alt = "logo"
        />

     {user ? (
        <div className='flex p-2'>
          <img
          className='w-12 h-12'
          alt='usericon'
          src={user?.photoURL}
          />
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>)
        : null
     }  
    </div>
  )
}

export default Header