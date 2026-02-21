import React from 'react';
import '../../styles/auth-shared.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("https://watch2eat-backend.onrender.com/api/auth/food-partner/login",{
          email,
        password},{
          withCredentials: true
        });

        
        navigate('/create-food');
    }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-login-title">
        <header>
          <div className="auth-icon">
            <svg width="200" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="32"
                  y="40"
                  text-anchor="middle"
                  font-family="Arial, Helvetica, sans-serif"
                  font-size="20"
                  font-weight="bold"
                  fill="#ff6a00">
                  Watch2Eat
              </text>
            </svg>
          </div>
          <h1 id="partner-login-title" className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New partner? <a href="/food-partner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
