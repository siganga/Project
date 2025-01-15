import React, { useState } from 'react';
import './Signup.css';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //New
  const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //New {user && }
    setIsLoading(true)
	  setError(null)


    const response = await fetch('http://localhost:5000/api/user/login/',{
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type':'application/json'
      }
    })

    const json = await response.json()//auth

    if(!response.ok){
      setIsLoading(false)
      setError(json.error)
      
    }

    if(response.ok){

        if(json.error){
          setError(json.error)
          console.log('Response from server:', json);       
          setIsLoading(false)
         
        }
        
        if(!json.error){
          dispatch(login(json));
          console.log('Response from server:', json);
          localStorage.setItem('auth', JSON.stringify(json));
          console.log(`User ID: ${json.userId}`);
          console.log(`User role: ${json.role}`);
          setIsLoading(false)
          navigate('/');
          setEmail('');
          setPassword('');
        }

      }




    // Handle form submission here
    console.log(email, password)




  };

  /**
   *
   */

  return (

    <form onSubmit={handleFormSubmit}>
        <h3>Log In</h3>


      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button disabled ={isLoading} type="submit">Log In</button>
      {error && <div> {error}</div>}
    </form>




  );
};

export default Login;
