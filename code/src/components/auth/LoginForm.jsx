import React, { useState } from "react";
import ApiService from '../../axios/AxiosService';
import logo from '../../components/assets/images/logo.png';
import { useAuth } from '../../authContext/AuthContext'; // Import useAuth hook
import { Navigate } from "react-router-dom";
import { setToken } from '../../axios/AxiosService';

export const LoginForm = () => {
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState(); // State to store userId
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get login function from useAuth hook

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
  
    ApiService.login(formData)
      .then(response => {
        const { token } = response.data;
        setToken(token);
        ApiService.me(token)
          .then(response => {
            // console.log(role)
            setUserId(response.data.userId); // Store userId in state
            login(response.data.role);
            setRedirect(true);
          })
          .catch(error => {
            console.error('Error fetching user ID:', error);
          });
      })
      .catch(error => {
        setError(error.response.data.message);
      });
  };
  
  if (redirect) {
    return <Navigate to={`/profile/${userId}`} />;
  }

  return (
    <div className="max-w-md mx-auto">
      <img src={logo} alt="Logo" className="mx-auto" style={{ maxWidth: "200px" }} />
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
      </form>
    </div>
  );
};
