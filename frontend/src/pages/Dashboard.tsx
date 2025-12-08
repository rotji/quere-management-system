import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebaseAuth';
import styles from './Dashboard.module.css';
import QueueList from '../components/QueueList';

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
  const [editingOrgId, setEditingOrgId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; email: string; address: string }>({ name: '', email: '', address: '' });
  const [stats, setStats] = useState<{ [orgId: string]: { queueCount: number } }>({});

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

      // Fetch stats for each organization
      const db2 = getFirestore();
      const statsObj: { [orgId: string]: { queueCount: number } } = {};
      for (const org of orgs) {
        const q2 = query(collection(db2, 'queues'), where('organizationId', '==', org.id));
        const qs2 = await getDocs(q2);
        statsObj[org.id] = { queueCount: qs2.size };
      }
      setStats(statsObj);
    };
    fetchOrganizations();
  }, []);

  const handleDelete = async (orgId: string) => {
    if (!window.confirm('Are you sure you want to delete this organization?')) return;
    const db = getFirestore();
    await deleteDoc(doc(db, 'organizations', orgId));
    setOrganizations(orgs => orgs.filter(o => o.id !== orgId));
  };

  const handleEdit = (org: Organization) => {
    setEditingOrgId(org.id);
    setEditForm({ name: org.name, email: org.email, address: org.address });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrgId) return;
    const db = getFirestore();
    await updateDoc(doc(db, 'organizations', editingOrgId), {
      name: editForm.name,
      email: editForm.email,
      address: editForm.address,
    });
    setOrganizations(orgs => orgs.map(o => o.id === editingOrgId ? { ...o, ...editForm } : o));
    setEditingOrgId(null);
  };

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
                {editingOrgId === org.id ? (
                  <form onSubmit={handleEditSubmit} className={styles.editForm}>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Organization Name"
                      required
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="Email"
                      required
                    />
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))}
                      placeholder="Address"
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingOrgId(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <h3>{org.name}</h3>
                    <p>Email: {org.email}</p>
                    <p>Address: {org.address}</p>
                    <p>Created: {new Date(org.createdAt).toLocaleString()}</p>
                    <div className={styles.orgActions}>
                      <button onClick={() => handleEdit(org)}>Edit</button>
                      <button onClick={() => handleDelete(org.id)}>Delete</button>
                    </div>
                    <div className={styles.orgStats}>
                      <span>Queues: {stats[org.id]?.queueCount ?? 0}</span>
                    </div>
                    <QueueList organizationId={org.id} />
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
