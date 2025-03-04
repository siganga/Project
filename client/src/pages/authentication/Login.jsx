import React, { useState } from 'react';
import { login } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/api/user/login/', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
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
                console.log(`User ID: ${json.userId}`);
                console.log(`User role: ${json.role}`);
                console.log(`User email: ${json.email}`);
                setIsLoading(false);
                navigate('/');
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
                <h3 className="text-2xl text-black  font-semibold mb-4">Log In</h3>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
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

                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {isLoading ? 'Logging In...' : 'Log In'}
                </button>

                <Link to="/signup">
                    <button className="mt-4  w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Sign Up
                    </button>
                </Link>

                {error && <div className="mt-4 text-red-500">{error}</div>}
            </form>

           
        </div>
    );
};

export default Login;