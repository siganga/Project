import { useLocation } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux'; 


function COBITResults() {
  const location = useLocation();
  const cobitResult = useSelector((state) => state.cobitResult.cobitResults); 
 
  console.log(cobitResult);
  const data = location.state?.data; // Access the data passed from the previous page
  //console.log(data)
  if (!data) {
    return <div className='flex-1 relative z-10 overflow-auto'>No data found.</div>; 
  }

  // Display the data using JSX
  return (
    <div className='flex-1 relative z-10 overflow-auto' >
    {cobitResult.map((result, index) => (
        <p key={index}>    Hello { result.num} - { result.rec}   </p>
      ))}
    </div>
  );
}

export default COBITResults;