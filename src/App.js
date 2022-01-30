import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import Landing from './pages/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
