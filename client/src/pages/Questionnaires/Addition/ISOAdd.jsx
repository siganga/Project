
import React, { useState } from 'react';


function ISOAdd() {
	 const [num, setNum] = useState('');
  const [rec, setRec] = useState('');
  const [scen, setScen] = useState(''); 
  const [imp, setImp] = useState(''); 
  const [lik, setLik] = useState(''); 



const handleSubmit = async (event) => {
    event.preventDefault();



    const response = await fetch('http://localhost:5000/api/isoRec',{
      method: 'POST',
      body: JSON.stringify({num, rec, scen, imp,lik}),
      headers: {
        'Content-Type':'application/json'
      }
    })

    const json = await response.json()//auth

    if(!response.ok){
      console.log('Response from server:', json);
      
    }

    if(response.ok){

        if(json.error){
       
          console.log('Response from server:', json);       
          
         
        }
        
        if(!json.error){
         
          console.log('Response from server:', json);
          console.log(`User num: ${json.num}`);
          console.log(`User rec: ${json.rec}`);
         
          setNum('');
          setRec('');
          setScen(''); 
          setImp(''); 
           setLik(''); 
        }

      }




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
        <div>
      <label htmlFor="scen">Scenario:</label>
      <input 
        type="text" 
        id="scen" 
        value={scen} 
        onChange={(e) => setScen(e.target.value)} 
      />
    </div>
    <div>
      <label htmlFor="imp">Impact:</label>
      <input 
        type="number" 
        id="imp" 
        value={imp} 
        onChange={(e) => setImp(e.target.value)} 
      />
    </div>
    <div>
      <label htmlFor="lik">Likelihood:</label>
      <input 
        type="number" 
        id="lik" 
        value={lik} 
        onChange={(e) => setLik(e.target.value)} 
      />
    </div>
        <button type="submit">Add Recommendation</button>
      </form>
    </div>
	);
}
export default ISOAdd;
