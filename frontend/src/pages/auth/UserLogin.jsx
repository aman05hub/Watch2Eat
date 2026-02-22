import React, {useState} from 'react';
import '../../styles/auth-shared.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const UserLogin = () => {
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

      setLoading(true);
      setError("");
      try {
        const response = await axios.post("https://watch2eat-backend.onrender.com/api/auth/user/login",{
          username,
          password
        },{
          withCredentials: true
        });

        navigate("/");
        
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-login-title">
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

          {error && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {error}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>
        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
