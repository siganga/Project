import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import copperTrophy from '../../assets/trophies/copper-trophy.png'; // Import your trophy images
import silverTrophy from '../../assets/trophies/silver-trophy.png';
import goldTrophy from '../../assets/trophies/gold-trophy.png';
import platinumTrophy from '../../assets/trophies/platinum-trophy.png';

import StatCard from '../../components/common/StatCard'; 








function UserStreak() {
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trophyImage, setTrophyImage] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.userId : null;

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/user/${userId}/streak`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch streak');
          }
          return response.json();
        })
        .then((data) => {
          setStreak(data.streak);
          setLoading(false);

          // Determine trophy image
          if (data.streak >= 183) {
            setTrophyImage(platinumTrophy);
          } else if (data.streak >= 91) {
            setTrophyImage(goldTrophy);
          } else if (data.streak >= 30) {
            setTrophyImage(silverTrophy);
          } else if (data.streak >= 7) {
            setTrophyImage(copperTrophy);
          } else {
            setTrophyImage(null); // No trophy
          }
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError('User not logged in');
    }
  }, [userId]);

  if (loading) {
    return <div>Loading streak...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {streak !== null ? (
        <div>
          <p>Your current streak: {streak}</p>
          {trophyImage && <img src={trophyImage} alt="Trophy" style={{ width: '80px', height: '80px' }} />}
        </div>
      ) : (
        <p>Streak not available.</p>
      )}
    </div>
  );
}

export default UserStreak;