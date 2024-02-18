import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import  {jwtDecode} from 'jwt-decode';

export default function Login() {
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();
  const { username, password } = credentials;

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
 
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/auth/login", credentials);
      console.log('Response:', response);
      
      console.log(response.data.user);
      console.log(response.data.jwt);
      
      if (response.data.user && response.data.jwt) {
        const token = response.data.jwt;
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.roles;
        
        // Check if the roles exist
        if (roles) {
          // Check if the role is "ADMIN" or "USER"
          if (roles === "ADMIN") {
            console.log("Admin login successful");
            localStorage.setItem('jwtToken', response.data.jwt);
            navigate("/admin_daret");
          } else {
            console.log("User login successful");
            localStorage.setItem('jwtToken', response.data.jwt);
            navigate("/home_daret");
          }
        } else {
          console.log("User login successful (no roles specified)");
          localStorage.setItem('jwtToken', response.data.jwt);
          navigate("/home_daret");
        }
      } else {
        alert("error, password or username Wrong.");
        setError('Invalid username / password');
      }
    } catch (error) {
      // Handle errors
       
      console.error('Error during login:', error.message);
      setError('Error during login. Please try again.');
    }
  };
  

/*
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/auth/login", credentials);
      console.log('Response:', response);
      console.log(response.data.user);
      console.log(response.data.jwt);
      if (response.data.user && response.data.jwt) { // Check if user and JWT token are present
        console.log("Login successful");
        localStorage.setItem('jwtToken', response.data.jwt); // Store JWT token in local storage
        navigate("/admin_daret");
      } else {
        setError('Invalid username / password');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
      console.error('Error during login:', error.message);

    }
    
  };*/

// Usage example:
const handleLogin = async () => {
  try {
    const user = await onSubmit(credentials); // Call the loginUser function with user credentials
    navigate('/home_daret'); // Navigate to the home page upon successful login
  } catch (error) {
    setError('Error during login. Please try again.'); // Handle login error
  }
};
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                < p className="lead fw-normal mb-0 me-3">Use Your Account</p>
              </div>
              {/* username input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">Username </label>
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid username "
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>

              {/* Password input */}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">Password</label>
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />

              </div>

              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}
                {/* <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                     <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label> 
                  </div>
                   <a href="#!" className="text-body">Forgot password?</a>  */}
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}

                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/" className="link-danger">Register</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        {/* Copyright */}
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2024. All rights reserved.
        </div>
        {/* Right */}
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        {/* Right */}
      </div>
    </section>

  );
};
