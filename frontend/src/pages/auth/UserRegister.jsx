import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const UserRegister = () => {

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response =await axios.post("https://watch2eat-backend.onrender.com/api/auth/user/register",{
            fullname: firstName + " " + lastName,
            username,
            email,
            password
        },{
            withCredentials: true
        });

        navigate("/");
    };

    return(
        <div className="auth-page-wrapper">
            <div className="auth-card" role="region" aria-labelledby="user-register-title">
                <header>
                    <div className="auth-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="6" width="20" height="2" fill="#8B4513"/>
                            <rect x="2" y="10" width="20" height="2" fill="#32CD32"/>
                            <rect x="2" y="12" width="20" height="2" fill="#FF6347"/>
                            <rect x="2" y="14" width="20" height="2" fill="#D2691E"/>
                            <rect x="2" y="16" width="20" height="2" fill="#8B4513"/>
                            <circle cx="6" cy="13" r="1" fill="#FFD700"/>
                            <circle cx="10" cy="13" r="1" fill="#FFD700"/>
                            <circle cx="14" cy="13" r="1" fill="#FFD700"/>
                            <circle cx="18" cy="13" r="1" fill="#FFD700"/>
                        </svg>
                    </div>
                    <h1 id="user-register-title" className="auth-title">Create your account</h1>
                    <p className="auth-subtitle">Join to explore and enjoy delicious meals</p>
                </header>
                <nav className="auth-alt-action" style={{ marginTop: '-4px' }}>
                    <strong style={{ fontWeight: 600 }}>Switch:</strong><Link to="/user/register">User</Link> • <Link to="/food-partner/register">Food partner</Link>
                </nav>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="two-col">
                        <div className="field-group">
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" name="firstName" placeholder="first Name" autoComplete="given-name" />
                        </div>
                        <div className="field-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" name="lastName" placeholder="Last Name" autoComplete="family-name" />
                        </div>
                    </div>
                    <div className="field-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" type="text" placeholder="Username" autoComplete="username" />
                    </div>
                    <div className="field-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
                    </div>
                    <div className="field-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="new-password" />
                    </div>
                    <button className="auth-submit" type="submit">Sign Up</button>
                </form>
                <div className="auth-alt-action">
                    Already have an account? <Link to="/user/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
