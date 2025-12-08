import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import styles from './QueueList.module.css';
import QueueActions from './QueueActions';

interface Queue {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

interface QueueListProps {
  organizationId: string;
}

const QueueList: React.FC<QueueListProps> = ({ organizationId }) => {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQueueName, setNewQueueName] = useState('');

  useEffect(() => {
    const fetchQueues = async () => {
      setLoading(true);
      const db = getFirestore();
      const q = query(
        collection(db, 'queues'),
        where('organizationId', '==', organizationId)
      );
      const querySnapshot = await getDocs(q);
      const queueList: Queue[] = [];
      querySnapshot.forEach(doc => {
        queueList.push({ id: doc.id, ...doc.data() } as Queue);
      });
      setQueues(queueList);
      setLoading(false);
    };
    fetchQueues();
  }, [organizationId]);

  const handleAddQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQueueName.trim()) return;
    const db = getFirestore();
    await addDoc(collection(db, 'queues'), {
      name: newQueueName,
      status: 'active',
      organizationId,
      createdAt: new Date().toISOString(),
    });
    setNewQueueName('');
    // Refresh queues
    const q = query(
      collection(db, 'queues'),
      where('organizationId', '==', organizationId)
    );
    const querySnapshot = await getDocs(q);
    const queueList: Queue[] = [];
    querySnapshot.forEach(doc => {
      queueList.push({ id: doc.id, ...doc.data() } as Queue);
    });
    setQueues(queueList);
  };

  return (
    <div className={styles.queueListContainer}>
      <h4>Queues</h4>
      {loading ? (
        <p>Loading queues...</p>
      ) : (
        <ul className={styles.queueList}>
          {queues.map(queue => (
            <li key={queue.id} className={styles.queueItem}>
              <div>
                <span className={styles.queueName}>{queue.name}</span>
                <span className={styles.status}>{queue.status}</span>
                <span className={styles.createdAt}>Created: {new Date(queue.createdAt).toLocaleString()}</span>
              </div>
              <QueueActions queue={queue} onQueueUpdated={() => {
                // Refresh queues
                const fetchQueues = async () => {
                  setLoading(true);
                  const db = getFirestore();
                  const q = query(
                    collection(db, 'queues'),
                    where('organizationId', '==', organizationId)
                  );
                  const querySnapshot = await getDocs(q);
                  const queueList: Queue[] = [];
                  querySnapshot.forEach(doc => {
                    queueList.push({ id: doc.id, ...doc.data() } as Queue);
                  });
                  setQueues(queueList);
                  setLoading(false);
                };
                fetchQueues();
              }} />
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAddQueue} className={styles.addQueueForm}>
        <input
          type="text"
          placeholder="New queue name"
          value={newQueueName}
          onChange={e => setNewQueueName(e.target.value)}
        />
        <button type="submit">Add Queue</button>
      </form>
    </div>
  );
};

export default QueueList;
