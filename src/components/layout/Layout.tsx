import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import OfflineIndicator from '../OfflineIndicator';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 min-w-0 md:ml-0">
        <OfflineIndicator />
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
