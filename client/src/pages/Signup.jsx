import React, { useState } from 'react';
import './Signup.css';
import { login } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  //New
  const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

  const dispatch = useDispatch();
   const navigate = useNavigate()


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //New
    setIsLoading(true)
	  setError(null)


    const response = await fetch('http://localhost:5000/api/user/signup/',{
      method: 'POST',
      body: JSON.stringify({name, email, password, role}),
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
          setIsLoading(false)
          navigate('/profile');
           setName('');
          setEmail('');
          setPassword('');
        }
         
         

        


      }




    // Handle form submission here
    console.log(name, email, password)



  };

  /**
   * useEffect(() => {
    // Load the authentication details from local storage when the component mounts
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      dispatch(login(auth));
    }
  }, [dispatch]);



  <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
   */

  return (
       <div className='flex-1 overflow-auto relative z-10'>
    <form onSubmit={handleFormSubmit}>
        <h3>Sign Up</h3>

      
      <div>

        <div className=" mb-12">
    <label htmlFor="name">Name:</label>
    <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
    />

     </div >


         <div className=" mt-20  mr-50">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        </div >

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

       <div>
          <label>Role:</label>
          <div>
            <label>
              <input
                type="radio"
                value="student"
                checked={role === 'student'}
                onChange={() => setRole('student')}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                value="teacher"
                checked={role === 'teacher'}
                onChange={() => setRole('teacher')}
              />
              Teacher
            </label>
          </div>
        </div> 


      <button disabled ={isLoading} type="submit">Sign Up</button>
      {error && <div> {error}</div>}
    </form>
    
      </div>




  );
};

export default Signup;