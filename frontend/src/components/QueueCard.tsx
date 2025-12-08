import React from 'react';
import styles from './QueueCard.module.css';

interface QueueCardProps {
  name: string;
  estimatedWait: string;
  peopleAhead: number;
  onJoin: () => void;
}

const QueueCard: React.FC<QueueCardProps> = ({ name, estimatedWait, peopleAhead, onJoin }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.info}>
        <span>Estimated Wait: <strong>{estimatedWait}</strong></span>
        <span>People Ahead: <strong>{peopleAhead}</strong></span>
      </div>
      <button className={styles.joinBtn} onClick={onJoin}>Join Queue</button>
    </div>
  );
};

export default QueueCard;
