import { useAuth } from '../../context/AuthContext';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 pl-14 pr-6 md:pl-8 md:pr-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0) || '?'}
          </div>
          <span className="text-sm text-gray-700">{user?.name}</span>
        </div>
      </div>
    </header>
  );
}
