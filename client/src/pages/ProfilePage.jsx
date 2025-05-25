import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout'; //  '../components/authentication/Logout'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const user = useSelector((state) => state.auth.user) || "";
    const userEmail = user ? user.email : null;
    const userName = user ? user.name : null;
    const userLogged = user ? true : false;
    const userId = user ? user.userId : null;

    let userAdmin = false;
    let userAuth = false;

    if (user.role === 'student') {
        userAdmin = true;
    }

    if (user.role === 'user') {
        userAuth = true;
    }

/*
 <div>
                                <span className="font-semibold">User ID:</span> {userId}
                            </div>


<li>
                    <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                </li>                            
*/


    const navigate = useNavigate(); // Hook for programmatic navigation

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
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <ul className="space-y-2">
                

                {!userLogged && (
                    <>
                         <li>
              <button
                onClick={handleSignUpClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </button>
            </li>
            <li>
              <button
                onClick={handleLoginClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Log In
              </button>
            </li>
            <li>
              <button
                    onClick={handleSignUpAsAdminClick}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                 >
                        Sign Up as Admin
                </button>
                </li>
                    </>
                )}

                {userLogged && (
                    <>
                        <li className="border rounded p-3">
                        
                            <div>
                                <span className="font-semibold">Name:</span> {userName}
                            </div>

                            <div>
                                <span className="font-semibold">Email:</span> {userEmail}
                            </div>
                            
                           
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default ProfilePage;