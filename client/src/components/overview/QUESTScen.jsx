import { useLocation } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux'; 


function QUESTScen() {
  const location = useLocation();
  const questResult = useSelector((state) => state.questResult.questResults); 
 
  console.log(questResult);
  
  return (
    <div className='flex-1 relative z-10 overflow-auto' >
    <h1 className='text-2xl font-bold mb-4 px-6'> Risk Scenarios   </h1>

    {questResult.map((result, index) => (
      <li key={index} className="px-6 py-1 mb-6">
        <p key={index}> {index + 1}. { result.scen}  { result.imp} { result.lik}        </p>
<p key={index}>
      <span style={{ color: 'blue' }}>Risk Score:</span>{' '}
      <span style={{ color: 'yellow' }}>{result.imp * result.lik}</span>{' '}
      <span style={{ color: 'blue' }}>Impact:</span>{' '}
      <span style={{ color: 'yellow' }}>{result.imp}</span>{' '}
      <span style={{ color: 'blue' }}>Likelihood:</span>{' '}
      <span style={{ color: 'yellow' }}>{result.lik}</span>
    </p>
       </li>        
      ))}
    </div>
  );
}

export default QUESTScen;