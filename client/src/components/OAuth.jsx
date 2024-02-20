import React from 'react'
import {GoogleAuthProvider,getAuth, signInWithPopup } from '@firebase/auth';
import { app } from '../firebase';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userslice';
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app) 

      const result = await signInWithPopup(auth, provider)
      const res = await fetch ('/api/auth/google',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
      });
      
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    }catch (error) {
    console.log("Could not sign in with Google", error);
  }
};

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-white border border-gray-300 text-gray-700 p-3 rounded-lg uppercase shadow-md hover:shadow-lg hover:bg-gray-50 '>
    <img src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' alt='Google Logo' className='h-6 w-6 mr-4  inline-flex'  />
    Continue with Google
  </button>
  
  
  
  )
}
