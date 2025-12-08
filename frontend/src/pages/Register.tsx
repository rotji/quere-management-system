import React, { useState } from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseAuth';

const Register: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError('');
      onRegister();
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerCard} onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className={styles.error}>{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
        <button type="submit">Register</button>
        <div className={styles.switchLink}>
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
