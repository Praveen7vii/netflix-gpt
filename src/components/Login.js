import React ,{useState}from 'react'
import Header from './Header'

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };


  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img
        src='https://assets.nflxext.com/ffe/siteui/vlv3/d482944d-eab4-4a64-89c9-a07a508a6e42/web/IN-en-20250929-TRIFECTA-perspective_4cf0c8a1-bd35-4d72-a49f-165021531dde_large.jpg'
        alt='logo'
        />
        </div>
       
       <form className='w-3/12 p-12 absolute my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75 bg-black'>
       <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"} </h1>

         {!isSignInForm &&   <input 
         type="text"
         placeholder='Full Name'
         className='p-2 my-4 w-full bg-gray-600'
         />}


         <input 
         type="text"
         placeholder='Email Address'
         className='p-2 my-4 w-full bg-gray-600'
         />

         <input type="text"
          placeholder='Password' 
          className='p-2 my-4 w-full bg-gray-600'
          />

         <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>
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