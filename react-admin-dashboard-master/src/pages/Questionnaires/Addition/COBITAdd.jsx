import React, { useState } from 'react';
//import axios from 'axios';

function COBITAdd (){
  const [num, setNum] = useState('');
  const [rec, setRec] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    //New {user && }
    //setIsLoading(true)
	 // setError(null)


    const response = await fetch('http://localhost:5000/api/cobitRec',{
      method: 'POST',
      body: JSON.stringify({num, rec}),
      headers: {
        'Content-Type':'application/json'
      }
    })

    const json = await response.json()//auth

    if(!response.ok){
      //setIsLoading(false)
      //setError(json.error)
      
    }

    if(response.ok){

        if(json.error){
          //setError(json.error)
          console.log('Response from server:', json);       
          //setIsLoading(false)
         
        }
        
        if(!json.error){
         // dispatch(login(json));
          console.log('Response from server:', json);
          //localStorage.setItem('auth', JSON.stringify(json));
          console.log(`User num: ${json.num}`);
          console.log(`User rec: ${json.rec}`);
          //setIsLoading(false)
          //navigate('/');
          setNum('');
          setRec('');
        }

      }




    // Handle form submission here
    console.log(num, rec)




  };

  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <h2>Add Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="num">Num:</label>
          <input 
            type="number" 
            id="num" 
            value={num} 
            onChange={(e) => setNum(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="rec">Recommendation:</label>
          <textarea 
            id="rec" 
            value={rec} 
            onChange={(e) => setRec(e.target.value)} 
          />
        </div>
        <button type="submit">Add Recommendation</button>
      </form>
    </div>
  );
};

export default COBITAdd;