import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import styles from './QueueActions.module.css';

interface Queue {
  id: string;
  name: string;
  status: string;
}

interface QueueActionsProps {
  queue: Queue;
  onQueueUpdated: () => void;
}

const QueueActions: React.FC<QueueActionsProps> = ({ queue, onQueueUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(queue.name);
  const [status, setStatus] = useState(queue.status);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const db = getFirestore();
    await updateDoc(doc(db, 'queues', queue.id), { name, status });
    setEditing(false);
    onQueueUpdated();
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this queue?')) return;
    const db = getFirestore();
    await deleteDoc(doc(db, 'queues', queue.id));
    onQueueUpdated();
  };

  return (
    <div className={styles.queueActionsContainer}>
      {editing ? (
        <form onSubmit={handleEdit} className={styles.editForm}>
          <input value={name} onChange={e => setName(e.target.value)} required />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={async () => {
            const db = getFirestore();
            await updateDoc(doc(db, 'queues', queue.id), { status: queue.status === 'active' ? 'inactive' : 'active' });
            onQueueUpdated();
          }}>
            {queue.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
        </>
      )}
    </div>
  );
};

export default QueueActions;
