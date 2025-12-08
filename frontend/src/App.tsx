import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Queues from './pages/Queues';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseAuth';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <Layout onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/queues" element={<Queues />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
          <Route path="/*" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
