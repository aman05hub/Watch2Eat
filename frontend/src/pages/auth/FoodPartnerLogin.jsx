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

        const response = await axios.post("http://localhost:3000/api/auth/food-partner/login",{
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
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16 Q12 8 20 16 L20 20 Q12 14 4 20 Z" fill="#F4A460"/>
              <ellipse cx="12" cy="18" rx="8" ry="2" fill="#D2691E"/>
              <circle cx="8" cy="16" r="1" fill="#228B22"/>
              <circle cx="12" cy="16" r="1" fill="#FF6347"/>
              <circle cx="16" cy="16" r="1" fill="#FFD700"/>
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