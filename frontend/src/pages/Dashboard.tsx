import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebaseAuth';
import styles from './Dashboard.module.css';

interface Organization {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      const db = getFirestore();
      const q = query(
        collection(db, 'organizations'),
        where('createdBy', '==', auth.currentUser?.uid || '')
      );
      const querySnapshot = await getDocs(q);
      const orgs: Organization[] = [];
      querySnapshot.forEach(doc => {
        orgs.push({ id: doc.id, ...doc.data() } as Organization);
      });
      setOrganizations(orgs);
      setLoading(false);
    };
    fetchOrganizations();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>
        <h2>Organization Dashboard</h2>
        {loading ? (
          <p>Loading...</p>
        ) : organizations.length === 0 ? (
          <p>No organizations found for your account.</p>
        ) : (
          <ul className={styles.orgList}>
            {organizations.map(org => (
              <li key={org.id} className={styles.orgItem}>
                <h3>{org.name}</h3>
                <p>Email: {org.email}</p>
                <p>Address: {org.address}</p>
                <p>Created: {new Date(org.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
