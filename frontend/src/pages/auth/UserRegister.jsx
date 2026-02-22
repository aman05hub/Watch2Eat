import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const UserRegister = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        setLoading(true);
        setError("");

        try{
        const response = await axios.post("https://watch2eat-backend.onrender.com/api/auth/user/register",{
            fullname: firstName + " " + lastName,
            username,
            email,
            password
        },{
            withCredentials: true
        });

        navigate("/");

        } catch (err) {
            setError(
                err.response?.data?.message || "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="auth-page-wrapper">
            <div className="auth-card" role="region" aria-labelledby="user-register-title">
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

                    {error && (
                        <p style={{ color: "red", fontSize: "14px" }}>
                            {error}
                        </p>
                    )}

                    <button className="auth-submit" type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                    
                </form>

                <div className="auth-alt-action">
                    Already have an account? <Link to="/user/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
