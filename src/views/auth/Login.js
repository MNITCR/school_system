import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    // Reset previous errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Please enter your email.');
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }

    try {
      // Replace the URL with your MongoDB server endpoint
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      // if login successful
      console.log(response.data);
      if(response.data === 'successful') {
        history.push('/dashboard');
        console.log('Login Successful:', response.data.message);
      }
      // Handle the response accordingly (e.g., redirect on successful login)
      console.log('Login Successful:', response.data);
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 p-2 w-full border rounded-md ${emailError && 'border-red-500'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 p-2 w-full border rounded-md ${passwordError && 'border-red-500'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded-md w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
