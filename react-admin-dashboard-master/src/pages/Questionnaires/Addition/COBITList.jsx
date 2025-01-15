import React, { useState, useEffect } from 'react';
//import axios from 'axios';

const COBITList = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {

    const fetchRecommendations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cobitRec'); // Adjust the API endpoint as needed
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

    fetchRecommendations();
  }, []);

  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((recommendation) => (
          <li key={recommendation._id}> 
            <p>Num: {recommendation.num}</p>
            <p>Recommendation: {recommendation.rec}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default COBITList;