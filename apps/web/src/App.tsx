import { useState } from 'react';
import { AppLayout } from './layout/AppLayout';
import { DashboardPage } from './pages/Dashboard';
import { GuestsPage } from './pages/GuestPage';
import { CreateUserPage } from './pages/CreateUserPage';
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './contexts/AuthContext';
import BudgetPage from './pages/BudgetPage';
import TasksPage from './pages/TasksPage';
import SuppliersPage from './pages/SuppliersPage';
import EventsPage from './pages/EventsPage';

export function App() {
  const { user, loading, signOut } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

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
      content = <DashboardPage />;
      break;
    case 'budget':
      content = <BudgetPage />;
      break;
    case 'tasks':
      content = <TasksPage />;
      break;
    case 'vendors':
      content = <SuppliersPage />;
      break;
    case 'events':
      content = <EventsPage />;
      break;
    default:
      content = <DashboardPage />;
  }

  return (
    <AppLayout
      activeNavId={activePage}
      onSelectNav={id => {
        if (id === 'logout') {
          console.log('Signing out');
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
