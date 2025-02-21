import React, { useState, useEffect } from 'react';



function ISOList() {
	const [recommendations, setRecommendations] = useState([]);

	 useEffect(() => {

    const fetchRecommendations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/isoRec'); 
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      
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
            <p>{recommendation.scen}</p>
            <p>{recommendation.imp}</p>
            <p>{recommendation.lik}</p>
          </li>
        ))}
      </ul>
		</div>
	);
}
export default ISOList;
