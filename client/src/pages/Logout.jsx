import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom';

function Logout() {
    
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate()

    
    const handleClick = async (e) =>{
        
        
        dispatch(logout());
        localStorage.removeItem('auth');
        navigate('/');
         
    
      }

  return (
    <div>
         <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}  > Logout </button>
    </div>
  )
  
}

export default Logout