import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login-prompt-modal.css'

const LoginPromptModal = ({ isOpen, onClose, action = 'do that' }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className="lpm-overlay" onClick={onClose}>
      <div className="lpm-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="lpm-title">

        <button className="lpm-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="lpm-icon" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>

        <h2 id="lpm-title" className="lpm-title">Login to {action}</h2>
        <p className="lpm-subtitle">Join Watch2Eat to like, save, and comment on food videos.</p>

        <div className="lpm-actions">
          <button className="lpm-btn lpm-btn--primary" onClick={() => navigate('/user/login')}>
            Log In
          </button>
          <button className="lpm-btn lpm-btn--outline" onClick={() => navigate('/user/register')}>
            Create Account
          </button>
        </div>

        <p className="lpm-partner-link">
          Are you a food partner? <a href="/food-partner/login">Login here</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPromptModal