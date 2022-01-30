import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import Landing from './pages/Landing';
import News from './pages/News';
import SingleNews from './pages/SingleNews';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<SingleNews />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
