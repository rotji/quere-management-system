import styles from './Layout.module.css';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => (
  <div className={styles.layout}>
    <nav className={styles.navbar}>
      <div className={styles.brand}>RemoteQueue</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/queues">Queues</Link></li>
        <li><Link to="/about">About</Link></li>
        {onLogout && (
          <li>
            <button className={styles.logoutBtn} onClick={onLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
    <main className={styles.main}>{children}</main>
  </div>
);

export default Layout;
