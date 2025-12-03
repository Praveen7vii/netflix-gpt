import React ,{useRef, useState}from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validate';
import { auth } from '../utils/Firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { BG_URL, USER_AVTR } from '../utils/Constants';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();  



  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //validate the form data    
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return; // if there is msg then it means there is error and return no signup/ sign in


    //Sign In Sign Up Logic
    if(!isSignInForm){
      // Sign Up Logic

      createUserWithEmailAndPassword(auth,
        email.current.value,
        password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
          updateProfile(user,{
            displayName:name.current.value,
            photoURL:USER_AVTR
          })
          .then(()=>{
           const {uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(
                addUser({
                  uid:uid,
                  email:email,
                  displayName:displayName, 
                  photoURL:photoURL,
                }));
          })
          .catch((error) => {
            setErrorMessage(error.message)
          })
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        const errorCode = error.code;
        setErrorMessage(errorCode+"-"+error.message);
      });
    }
    else{
      // Sign In Logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(
            addUser({
              uid:uid,
              email:email,
              displayName:displayName, 
              photoURL:photoURL,
            }));
        navigate("/browse")
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        setErrorMessage(error.code + " - " + error.message);
      });

    }

  }


  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img
          className='h-screen object-cover md:object-fill md:w-screen'
          src={BG_URL}
          alt='logo'
        />
        </div>
       
       <form onSubmit={(e)=>{e.preventDefault()}} className='w-full md:w-3/12 p-12 absolute my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75 bg-black'>
       <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"} </h1>

         {!isSignInForm &&   <input 
         ref={name}
         type="text"
         placeholder='Full Name'
         className='p-2 my-4 w-full bg-gray-600'
         />}

        {!isSignInForm &&   <input 
         type="text"
         placeholder='Phone Number'
         className='p-2 my-4 w-full bg-gray-600'
         />}

         <input 
         ref={email}
         type="text"
         placeholder='Email Address'
         className='p-2 my-4 w-full bg-gray-600'
         />

         <input  
          ref={password}
          type="text"
          placeholder='Password' 
          className='p-2 my-4 w-full bg-gray-600'
          />

        {!isSignInForm &&   <input 
         type="text"
         placeholder='Confirm Password'
         className='p-2 my-4 w-full bg-gray-600'
         />}

         <p className='text-red-700 font-bold p-4'>{errorMessage}</p>

         <button className='p-4 my-6 bg-red-700 w-full rounded-lg'
         onClick={handleButtonClick}
         >
          {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          
         <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          
          {
            isSignInForm ?
            "New to Netflix ? Sign Up Now" :
            "Already registered ? Sign In"
          }
         </p>
       </form>
        
    </div>
  )
}

export default Login