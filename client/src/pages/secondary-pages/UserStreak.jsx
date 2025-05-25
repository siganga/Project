import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import copperTrophy from '../../assets/trophies/copper-trophy.png';
import silverTrophy from '../../assets/trophies/silver-trophy.png';
import goldTrophy from '../../assets/trophies/gold-trophy.png';
import platinumTrophy from '../../assets/trophies/platinum-trophy.png';

// Assuming StatCard is a component you might have, if not, you can remove it or implement it.
// import StatCard from '../../components/common/StatCard';

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
            setError('User not logged in'); // Or handle this by not showing the component
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center h-48">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading streak...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 rounded-lg shadow-md text-red-700 text-center h-48 flex items-center justify-center">
                <p>Error: {error}</p>
            </div>
        );
    }

    // Don't render if no streak and no error
    if (streak === null && !error) {
        return (
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-gray-700 text-center h-48 flex flex-col items-center justify-center">
                <p className="text-lg font-semibold mb-2">Welcome!</p>
                <p>Log in to track your streak.</p>
                {/* You might want a login button here */}
            </div>
        );
    }

    return (
        <div className="p-6 bg-green-50 rounded-lg shadow-md flex flex-col items-center justify-center h-48 transition-transform duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Daily Streak</h3>
            <p className="text-4xl font-bold text-green-900 mb-4">
                {streak} <span className="text-xl">days</span>
            </p>
            {trophyImage && (
                <img src={trophyImage} alt="Trophy" className="w-16 h-16 object-contain" />
            )}
            {!trophyImage && streak > 0 && (
                <p className="text-sm text-green-700">Keep going to earn your first trophy!</p>
            )}
            {streak === 0 && (
                 <p className="text-sm text-green-700">Start your streak today!</p>
            )}
        </div>
    );
}

export default UserStreak;