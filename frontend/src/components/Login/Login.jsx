import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/ApiUtils'; 
import { UserContext } from '../../UserContext'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { user,setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser(email, password);
      setUser(loginData.user); 
      console.log('Login successful:', loginData);
      
      navigate(`/dashboard/${email}`);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
