import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';




export default function SignIn() {
  const [formData,setFormData] = useState({});
 const {loading,error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange =(e) =>
{
setFormData(
  {
   ...formData,
   [e.target.id]: e.target.value,

  });
} ;
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(signInStart());
  const res = await fetch('api/auth/signin',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  console.log(data);
  if (data.success === false) {
    dispatch(signInFailure(data.message));
    return;
  }
  dispatch(signInSuccess(data));
  navigate('/');
    
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
  
};

   return (
    <div className='p-3 max-w-md mx-auto  mt-20 bg-slate-200 rounded-lg shadow-md'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input type='text' placeholder='Email' className='border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500' id='email' 
        onChange={handleChange} />
        <input type='password' placeholder='Password' className='border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500' id='password' 
        onChange={handleChange} />
        
        <button
  disabled={loading}
  className='bg-blue-500 text-white py-3 rounded-lg mt-3 hover:bg-blue-600 focus:outline-none transition-colors duration-300'
>
  {loading ? 'Loading..' : 'SIGN IN'}
</button>

        <OAuth/>
      </form>

      <div className='flex justify-center mt-6'>
        <p className='text-gray-600'>Don't have an account? </p>
        <Link to="/sign-up" className='text-blue-500 hover:underline ml-2'>Sign up</Link>
      </div>
      {error && <p className='text-red-400 mt-5'>{error}</p>}
    </div>
  );
}
