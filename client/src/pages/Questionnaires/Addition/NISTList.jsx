import React, { useState, useEffect } from 'react';
//import axios from 'axios';

function NISTList() {

	const [recommendations, setRecommendations] = useState([]);
    // <button onClick={handleDeleteAll}>Delete All Recommendations</button> 
	useEffect(() => {

    const fetchRecommendations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/nistRec'); // Adjust the API endpoint as needed
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



	const handleDeleteAll = async () => {
    try {
      // Send a DELETE request to the backend API
      const response = await fetch('http://localhost:5000/api/nistRec/delete-all', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete all recommendations');
      }

      // Update the state to reflect the deleted recommendations
      setRecommendations([]); 

      // Optionally, display a success message to the user
      alert('All recommendations deleted successfully!');
    } catch (error) {
      console.error('Error deleting recommendations:', error);
      // Display an error message to the user
      alert('Failed to delete recommendations. Please try again.');
    }
  };

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
export default NISTList;
