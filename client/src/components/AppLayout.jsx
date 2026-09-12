import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <header>
        <span className="avatar-placeholder" aria-hidden="true" />
        <span className="username">{user?.username}</span>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
