import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout'; //  '../components/authentication/Logout'
import { useSelector } from 'react-redux';

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

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <ul className="space-y-2">
                <li>
                    <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                </li>

                {!userLogged && (
                    <>
                        <li>
                            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
                        </li>
                    </>
                )}

                {userLogged && (
                    <>
                        <li className="border rounded p-3">
                            <div>
                                <span className="font-semibold">Email:</span> {userEmail}
                            </div>
                            <div>
                                <span className="font-semibold">Name:</span> {userName}
                            </div>
                            <div>
                                <span className="font-semibold">User ID:</span> {userId}
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