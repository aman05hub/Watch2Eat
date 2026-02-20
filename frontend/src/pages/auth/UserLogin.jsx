import React from 'react';
import '../../styles/auth-shared.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const UserLogin = () => {
const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/user/login",{
          username,
          password
        },{
          withCredentials: true
        });

        navigate("/");
        
    }
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-login-title">
        <header>
          <div className="auth-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="#FFA500" stroke="#8B4513" strokeWidth="1"/>
              <path d="M12 2 L22 12 L12 22" fill="#FF6347"/>
              <circle cx="8" cy="8" r="1" fill="#000"/>
              <circle cx="16" cy="10" r="1" fill="#000"/>
              <circle cx="10" cy="14" r="1" fill="#000"/>
            </svg>
          </div>
          <h1 id="user-login-title" className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your food journey.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" placeholder="Username" autoComplete="username" />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;