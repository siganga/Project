import React from 'react';
import { useSelector } from 'react-redux';
import UserStreak from './secondary-pages/UserStreak.jsx'; 
import { Link } from 'react-router-dom';

function HomePage() {
    const user = useSelector((state) => state.auth.user); 
    const userName = user ? user.name : 'Guest'; 

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6 bg-blue-1200 min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full text-center p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in-down">
                    Welcome, {userName}!
                </h1>
                <p className="text-xl text-gray-700 mb-8 animate-fade-in-up">
                    We hope you have  a great time.
                </p>

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {/* User Streak Card */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 w-full max-w-xs">
                        <UserStreak />
                    </div>

                   
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 w-full max-w-xs p-6 bg-purple-50 rounded-lg shadow-md flex flex-col items-center justify-center animate-fade-in-up delay-200">
                         
                        <Link to="/classrooms" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                            View Classrooms
                        </Link>
                    </div>

                    <div className="col-span-1 md:col-span-1 lg:col-span-1 w-full max-w-xs p-6 bg-yellow-50 rounded-lg shadow-md flex flex-col items-center justify-center animate-fade-in-up delay-400">
                       
                        <Link to="/profile" className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors">
                            Your Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;