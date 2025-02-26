import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom';

function Logout() {
    
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);// Maybe not needed, handle logout  below
    const navigate = useNavigate()

    
    const handleClick = async (e) =>{
        
        
        dispatch(logout());
        localStorage.removeItem('auth');
        navigate('/');
         
    
      }

  return (
    <div>
         <button onClick={handleClick}> logout </button>
    </div>
  )
  
}

export default Logout