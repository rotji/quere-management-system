import React, { useState } from 'react';
import styles from './Queues.module.css';
import QueueCard from '../components/QueueCard';

// Demo queue data
const demoQueues = [
  { name: 'Bank Teller 3', estimatedWait: '10 min', peopleAhead: 5 },
  { name: 'Hospital Reception', estimatedWait: '15 min', peopleAhead: 8 },
  { name: 'Supermarket Checkout', estimatedWait: '7 min', peopleAhead: 3 },
];
const Queues: React.FC = () => {
  const [queueName, setQueueName] = useState('');
  const [description, setDescription] = useState('');
  const [queues, setQueues] = useState(demoQueues);
  const [joinedQueueIdx, setJoinedQueueIdx] = useState<number | null>(null);
  // Track user's position in the joined queue
  const [userPosition, setUserPosition] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQueues([
      ...queues,
      {
        name: queueName,
        estimatedWait: '5 min',
        peopleAhead: Math.floor(Math.random() * 10),
      },
    ]);
    setQueueName('');
    setDescription('');
  };

  const handleJoin = (idx: number) => {
    setJoinedQueueIdx(idx);
    setUserPosition(queues[idx].peopleAhead + 1);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formSection}>
        <h2>Create a New Queue</h2>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Queue Name:</label>
            <input
              type="text"
              value={queueName}
              onChange={e => setQueueName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">Create Queue</button>
        </form>
      </div>
      <div className={styles.listSection}>
        <h2>Queues</h2>
        {joinedQueueIdx !== null && userPosition !== null && (
          <div className={styles.positionAlert}>
            You are in Queue {joinedQueueIdx + 1}. Your current position: {userPosition}
          </div>
        )}
        <div className={styles.queueGrid}>
          {queues.map((q, idx) => (
            <QueueCard
              key={idx}
              name={`Queue ${idx + 1}`}
              estimatedWait={q.estimatedWait}
              peopleAhead={q.peopleAhead}
              onJoin={() => handleJoin(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Queues;
