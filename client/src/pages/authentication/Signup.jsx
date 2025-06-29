import React, { useState } from 'react';
import { login } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/api/user/signup/', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            if (json.error) {
                setError(json.error);
                console.log('Response from server:', json);
                setIsLoading(false);
            }

            if (!json.error) {
                dispatch(login(json));
                console.log('Response from server:', json);
                localStorage.setItem('auth', JSON.stringify(json));
                setIsLoading(false);
                navigate('/profile');
                setName('');
                setEmail('');
                setPassword('');
            }
        }
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6 flex justify-center items-center">
            <form
                onSubmit={handleFormSubmit}
                className="max-w-md w-full p-6 bg-white rounded-md shadow-md"
            >
                <h3 className="text-2xl text-black font-semibold mb-4">Sign Up</h3>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="mt-1  p-2 w-full border rounded-md"
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
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role:</label>
                    <div className="mt-1 space-y-2">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                value="student"
                                checked={role === 'student'}
                                onChange={() => setRole('student')}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-1 mr-3 text-gray-700">Student</span>
                        </label>
                        
                    </div>
                </div>

                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>

                <Link to="/login">
                    <button className="mt-4  w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Log In
                    </button>
                </Link>

                {error && <div className="mt-4 text-red-500">{error}</div>}
            </form>
        </div>
    );
};

export default Signup;