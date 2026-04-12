import React from 'react';

import './App.css'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
        <div className="app-wrapper">
          <AppRoutes />
      </div>
    </AuthProvider>
  )
}

export default App
