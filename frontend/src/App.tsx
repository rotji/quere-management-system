import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Queues from './pages/Queues';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState, useEffect } from 'react';
import { auth } from './firebaseAuth';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
      <Layout onLogout={isAuthenticated ? handleLogout : undefined}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/queues" element={<Queues />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {!isAuthenticated && (
          showRegister ? (
            <Register onRegister={() => { setIsAuthenticated(true); setShowRegister(false); }} />
          ) : (
            <Login onLogin={() => setIsAuthenticated(true)} />
          )
        )}
        {!isAuthenticated && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            {showRegister ? (
              <button onClick={() => setShowRegister(false)}>Already have an account? Login</button>
            ) : (
              <button onClick={() => setShowRegister(true)}>Don't have an account? Register</button>
            )}
          </div>
        )}
      </Layout>
    </Router>
  );
}

export default App;
