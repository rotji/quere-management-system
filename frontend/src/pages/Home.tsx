import React from 'react';
import styles from './Home.module.css';
import Button from '../components/Button';

import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>RemoteQueue</h1>
        <p className={styles.subtitle}>Create remote queues for your customers and help your organization avoid the stress of long lines.</p>
        <div className={styles.buttonGroup}>
          <Button onClick={() => navigate('/register-organization')}>Register Organization</Button>
        </div>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <h3>Fast Setup</h3>
            <p>Register your organization and start managing queues in minutes.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Real-Time Updates</h3>
            <p>Track queue status and customer flow instantly from any device.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Secure & Reliable</h3>
            <p>Built on Firebase for robust authentication and data security.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
