import React from 'react';


import styles from './About.module.css';

const About: React.FC = () => (
  <div className={styles.aboutContainer}>
    <div className={styles.aboutCard}>
      <h2 className={styles.title}>About RemoteQueue</h2>
      <p className={styles.intro}>
        RemoteQueue is a modern platform designed to help organizations manage customer queues remotely, reducing wait times and improving service efficiency. Our mission is to eliminate the stress of long lines and provide a seamless experience for both businesses and their customers.
      </p>
      <div className={styles.section}>
        <h3>Key Features</h3>
        <ul className={styles.featuresList}>
          <li>Remote queue creation and management</li>
          <li>Real-time queue updates and notifications</li>
          <li>Secure authentication and data storage (powered by Firebase)</li>
          <li>Organization dashboard for queue analytics</li>
          <li>Easy customer check-in and status tracking</li>
          <li>Mobile-friendly, responsive design</li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3>How It Works</h3>
        <p>
          Organizations register on RemoteQueue and set up their queues. Customers can join queues remotely using their devices, receive real-time updates, and arrive just in time for their turn. This system streamlines operations and enhances customer satisfaction.
        </p>
      </div>
      <div className={styles.section}>
        <h3>Why Choose RemoteQueue?</h3>
        <ul className={styles.benefitsList}>
          <li>Reduce physical crowding and waiting times</li>
          <li>Boost staff productivity and service quality</li>
          <li>Gain insights with queue analytics</li>
          <li>Enhance customer experience and loyalty</li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Get Started Today</h3>
        <p>
          Register your organization and create your first remote queue to experience the future of queue management!
        </p>
      </div>
    </div>
  </div>
);

export default About;
