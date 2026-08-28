import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

const roles: { role: UserRole; label: string; icon: string; desc: string; route: string }[] = [
  { role: 'farmer', label: 'Continue as Farmer', icon: '👨‍🌾', desc: 'Manage produce, compare selling options, book procurement', route: '/farmer' },
  { role: 'buyer', label: 'Continue as Buyer', icon: '🛒', desc: 'Browse produce, place orders, track deliveries', route: '/buyer' },
  { role: 'procurement_officer', label: 'Continue as Procurement Officer', icon: '🏛️', desc: 'Manage queues, verify farmers, process procurement', route: '/procurement' },
  { role: 'admin', label: 'Continue as Admin', icon: '⚙️', desc: 'View analytics, manage system, monitor platform', route: '/admin' },
];

export default function DemoLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole, route: string) => {
    login(role);
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-earth-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">🌾</span>
            <span className="text-2xl font-bold text-primary-800">FarmWise</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to FarmWise</h1>
          <p className="text-gray-500 mt-2">Choose your role to explore the platform</p>
        </div>

        {/* Demo Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-amber-700 font-semibold text-sm">🧪 DEMO ENVIRONMENT</p>
          <p className="text-amber-600 text-xs mt-1">All data is simulated. No real transactions.</p>
        </div>

        {/* Role Buttons */}
        <div className="space-y-3">
          {roles.map(r => (
            <button
              key={r.role}
              onClick={() => handleLogin(r.role, r.route)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl p-5 text-left hover:border-primary-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-primary-100 transition-colors">
                  {r.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{r.label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{r.desc}</p>
                </div>
                <span className="text-gray-300 group-hover:text-primary-500 transition-colors text-xl">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
