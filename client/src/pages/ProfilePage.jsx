import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Logout from './Logout'; 
const ProfilePage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

   
    const { email: userEmail, name: userName, userId, role: userRole } = user || {};
    const userLogged = !!user; 

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignUpAsAdminClick = () => {
        navigate('/signup-admin');
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6 bg-blue-1200 min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-md  w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {userLogged ? 'Your Profile' : 'Welcome to the Profile Page!'}
                </h2>

                {!userLogged ? (
                    <div className="space-y-4">
                        <p className="text-gray-600 text-center mb-6">
                            It looks like you're not logged in. Please sign up or log in to view your profile and access more features.
                        </p>
                        <button
                            onClick={handleSignUpClick}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={handleLoginClick}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
                        >
                            Log In
                        </button>
                        <button
                            onClick={handleSignUpAsAdminClick}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
                        >
                            Sign Up as Admin
                        </button>
                        
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-200">
                            <div className="flex-shrink-0">
                               
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-semibold">
                                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900">{userName}</h3>
                                <p className="text-md text-gray-600">{userEmail}</p>                 
                                 
                            </div>
                   
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-gray-700">
                            
                                                       
                        </div>

                        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-center">
                            <Logout className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;