import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';




export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [error,setError] =useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
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
    setLoading(true);
  const res = await fetch('api/auth/signup',
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
    setLoading(false);
    setError(data.message);
    return;
  }
  setLoading(false);
  setError(null);
  navigate('/sign-in');
    
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
  
};

   return (
    <div className='p-3 max-w-md mx-auto  mt-20 bg-slate-200 rounded-lg shadow-md'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' className='border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500' id='username' 
        onChange={handleChange} />
        <input type='text' placeholder='Email' className='border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500' id='email' 
        onChange={handleChange} />
        <input type='password' placeholder='Password' className='border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500' id='password' 
        onChange={handleChange} />
        
        <button disabled={loading} className='bg-blue-500 text-white py-3 rounded-lg mt-3 hover:bg-blue-600 focus:outline-none'>{loading ? 'Loading..' : 'SIGN UP'}</button>
      </form>

      <div className='flex justify-center mt-6'>
        <p className='text-gray-600'>Already have an account? </p>
        <Link to="/sign-in" className='text-blue-500 hover:underline'>Sign in</Link>
      </div>
      {error && <p className='text-red-400 mt-5'>{error}</p>}
    </div>
  );
}
