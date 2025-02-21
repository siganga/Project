import { useLocation } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux'; 


function QUESTResults() {
  const location = useLocation();
  const questResult = useSelector((state) => state.questResult.questResults); 
 
  console.log(questResult);
  
  return (
    <div className='flex-1 relative z-10 overflow-auto' >
    <h1 className='text-2xl font-bold mb-4 px-6'> Recommendations   </h1>

    {questResult.map((result, index) => (
      <li key={index} className="px-6 py-1 ">
        <p key={index}> {index + 1}.  { result.scen}      </p>
       </li>        
      ))}
    </div>
  );
}

export default QUESTResults;