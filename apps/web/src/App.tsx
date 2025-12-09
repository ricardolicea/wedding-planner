import { useState } from 'react';
import { AppLayout } from './layout/AppLayout';
import { DashboardPage } from './pages/Dashboard';
import { GuestsPage } from './pages/GuestPage';
import { CreateUserPage } from './pages/CreateUserPage';
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './contexts/AuthContext';

export function App() {
  const { user, loading, signOut } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  console.log('Loading user:', loading);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <AuthPage />;
  }

  const isAdmin = user.email === 'ricardo.liceamata@gmail.com';

  let content = null;
  switch (activePage) {
    case 'guests':
      content = <GuestsPage />;
      break;
    case 'admin-users':
      content = <CreateUserPage />;
      break;
    case 'dashboard':
    default:
      content = <DashboardPage />;
  }

  return (
    <AppLayout
      activeNavId={activePage}
      onSelectNav={id => {
        if (id === 'logout') {
          signOut();
          return;
        }
        setActivePage(id);
      }}
      isAdmin={isAdmin}
    >
      {content}
    </AppLayout>
  );
}

export default App;
