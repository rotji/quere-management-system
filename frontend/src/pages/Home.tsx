import React from 'react';
import styles from './Home.module.css';
import Button from '../components/Button';

const Home: React.FC = () => (
  <div className={styles.container}>
    <h1>Welcome to Queue Management System</h1>
    <Button>Get Started</Button>
  </div>
);

export default Home;
