import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      tempErrors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      tempErrors["email"] = "Email is invalid";
    }

    if (!password) {
      isValid = false;
      tempErrors["password"] = "Password is required";
    } else if (password.length < 8) {
      isValid = false;
      tempErrors["password"] = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      isValid = false;
      tempErrors["password"] = "Password must contain at least one uppercase letter";
    }

    if (!username) {
      isValid = false;
      tempErrors["username"] = "Username is required";
    } else if (!/^[a-zA-Z]+$/.test(username)) {
      isValid = false;
      tempErrors["username"] = "Username must be in English letters only";
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('https://67059848031fd46a83108131.mockapi.io/LogIn', {
          email,
          password,
          username
        });

        if (response.status === 201) {
          navigate('/login');
        } else {
          console.log('Failed to sign up');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
            />
            {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
          </div>
          <button type="submit" className="btn bg-cyan-900 text-white w-full">Sign Up</button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account? 
          <Link to="/login" className="text-blue-500 hover:underline"> Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
