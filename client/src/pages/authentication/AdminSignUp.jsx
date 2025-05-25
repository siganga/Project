// AdminSignup.js
import React, { useState } from 'react';
import { login } from '../../redux/authSlice'; // Assuming you still want to log them in immediately
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AdminSignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessCode, setAccessCode] = useState(''); // New state for access code
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        // Ensure all required fields are present
        if (!name || !email || !password || !accessCode) {
            setError('All fields must be filled');
            setIsLoading(false);
            return;
        }

        const response = await fetch('http://localhost:5000/api/user/signup/admin', { // Target the admin signup route
            method: 'POST',
            body: JSON.stringify({ name, email, password, accessCode }), // Include accessCode in the body
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error || 'Something went wrong on the server.'); // Provide a fallback error message
        } else { // response.ok is true
            if (json.error) {
                // This handles errors returned with a 200 OK status from the backend,
                // like 'Invalid access code' (though your backend for signupAdmin might return 401 for that now)
                setError(json.error);
                console.log('Response from server (with error):', json);
                setIsLoading(false);
            } else {
                // Successful admin signup and login
                dispatch(login(json));
                console.log('Admin signup successful:', json);
                localStorage.setItem('auth', JSON.stringify(json));
                setIsLoading(false);
                navigate('/');//navigate('/admin-dashboard'); // Navigate to an admin-specific dashboard
                // Clear form fields
                setName('');
                setEmail('');
                setPassword('');
                setAccessCode('');
            }
        }
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6 flex justify-center items-center">
            <form
                onSubmit={handleFormSubmit}
                className="max-w-md w-full p-6 bg-white rounded-md shadow-md"
            >
                <h3 className="text-2xl text-black font-semibold mb-4">Sign Up as Admin</h3>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                {/* New field for Access Code */}
                <div className="mb-4">
                    <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700">Admin Access Code:</label>
                    <input
                        type="text" // Or "password" if you want to hide it
                        id="accessCode"
                        value={accessCode}
                        onChange={(event) => setAccessCode(event.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                    {isLoading ? 'Signing Up Admin...' : 'Sign Up as Admin'}
                </button>

                <Link to="/login">
                    <button className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </Link>

                {error && <div className="mt-4 text-red-500">{error}</div>}
            </form>
        </div>
    );
};

export default AdminSignUp;