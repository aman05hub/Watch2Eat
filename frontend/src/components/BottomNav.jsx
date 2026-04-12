// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import '../styles/bottom-nav.css'

// const BottomNav = () => {
//   return (
//     <nav className="bottom-nav" role="navigation" aria-label="Bottom">
//       <div className="bottom-nav__inner">
//         <NavLink to="/" end className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
//           <span className="bottom-nav__icon" aria-hidden="true">
//             {/* home icon */}
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M3 10.5 12 3l9 7.5"/>
//               <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
//             </svg>
//           </span>
//           <span className="bottom-nav__label">Home</span>
//         </NavLink>

//         <NavLink to="/saved" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
//           <span className="bottom-nav__icon" aria-hidden="true">
//             {/* bookmark icon */}
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
//             </svg>
//           </span>
//           <span className="bottom-nav__label">Saved</span>
//         </NavLink>
//       </div>
//     </nav>
//   )
// }

// export default BottomNav

import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/bottom-nav.css'

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5 12 3l9 7.5"/>
    <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
  </svg>
)

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
  </svg>
)

const navItems = [
  { to: '/', label: 'Home', icon: <HomeIcon />, end: true },
  { to: '/saved', label: 'Saved', icon: <BookmarkIcon /> },
]

const BottomNav = () => {
  return (
    <>
      {/* ── Sidebar: desktop ── */}
      <nav className="sidebar-nav" role="navigation" aria-label="Main">
        <div className="sidebar-nav__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="13" fill="#ff6a00" opacity=".15"/>
            <path d="M8 10h12M8 14h8M8 18h10" stroke="#ff6a00" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="sidebar-nav__logo-text">Watch2Eat</span>
        </div>

        <div className="sidebar-nav__items">
          {navItems.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `sidebar-nav__item ${isActive ? 'is-active' : ''}`}
            >
              <span className="sidebar-nav__icon" aria-hidden="true">{icon}</span>
              <span className="sidebar-nav__label">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── Bottom bar: mobile ── */}
      <nav className="bottom-nav" role="navigation" aria-label="Bottom">
        <div className="bottom-nav__inner">
          {navItems.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}
            >
              <span className="bottom-nav__icon" aria-hidden="true">{icon}</span>
              <span className="bottom-nav__label">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}

export default BottomNav