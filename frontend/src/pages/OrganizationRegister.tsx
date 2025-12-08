import React, { useState } from 'react';
import styles from './OrganizationRegister.module.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebaseAuth';

const OrganizationRegister: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const db = getFirestore();
      await addDoc(collection(db, 'organizations'), {
        name,
        email,
        address,
        createdBy: auth.currentUser?.uid || null,
        createdAt: new Date().toISOString(),
      });
      setSuccess('Organization registered successfully!');
      setName('');
      setEmail('');
      setAddress('');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className={styles.orgContainer}>
      <form className={styles.orgCard} onSubmit={handleSubmit}>
        <h2>Register Organization</h2>
        {success && <div className={styles.success}>{success}</div>}
        {error && <div className={styles.error}>{error}</div>}
        <input
          type="text"
          placeholder="Organization Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Organization Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default OrganizationRegister;
