import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';  

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://67059848031fd46a83108131.mockapi.io/LogIn');
      const users = response.data;

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userEmail', email);
      
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error fetching users', err);
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="btn bg-cyan-900 w-full text-white">Login</button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? 
          <Link to="/" className="text-blue-500 hover:underline"> Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
