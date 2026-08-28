import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const farmerLinks = [
  { to: '/farmer', label: 'Dashboard', icon: '📊' },
  { to: '/farmer/produce', label: 'My Produce', icon: '🌾' },
  { to: '/farmer/marketplace', label: 'Marketplace', icon: '🛒' },
  { to: '/farmer/smart-sell', label: 'Smart Sell', icon: '🤖' },
  { to: '/farmer/procurement', label: 'Govt Procurement', icon: '🏛️' },
  { to: '/farmer/orders', label: 'My Orders', icon: '📦' },
  { to: '/farmer/queue', label: 'Queue', icon: '⏱️' },
  { to: '/farmer/payments', label: 'Payments', icon: '💰' },
  { to: '/farmer/notifications', label: 'Notifications', icon: '🔔' },
  { to: '/farmer/profile', label: 'Profile', icon: '👤' },
  { to: '/demand', label: 'Market Insights', icon: '📈' },
];

const buyerLinks = [
  { to: '/buyer', label: 'Dashboard', icon: '📊' },
  { to: '/buyer/marketplace', label: 'Marketplace', icon: '🛒' },
  { to: '/buyer/orders', label: 'My Orders', icon: '📦' },
  { to: '/buyer/logistics', label: 'Logistics', icon: '🚚' },
  { to: '/buyer/payments', label: 'Payments', icon: '💰' },
  { to: '/buyer/profile', label: 'Profile', icon: '👤' },
];

const procurementLinks = [
  { to: '/procurement', label: 'Dashboard', icon: '📊' },
  { to: '/procurement/queue', label: "Today's Queue", icon: '⏱️' },
  { to: '/procurement/slots', label: 'Slot Management', icon: '📅' },
  { to: '/procurement/verify', label: 'Farmer Verification', icon: '✅' },
  { to: '/procurement/process', label: 'Procurement', icon: '🌾' },
  { to: '/procurement/payments', label: 'Payments', icon: '💰' },
];

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: '📊' },
  { to: '/admin/farmers', label: 'Farmers', icon: '👨‍🌾' },
  { to: '/admin/buyers', label: 'Buyers', icon: '🛒' },
  { to: '/admin/marketplace', label: 'Marketplace', icon: '🏪' },
  { to: '/admin/procurement', label: 'Procurement Centres', icon: '🏛️' },
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/payments', label: 'Payments', icon: '💰' },
  { to: '/admin/analytics', label: 'Analytics', icon: '📈' },
  { to: '/admin/map', label: 'Map', icon: '🗺️' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { getUnreadCount } = useApp();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  if (!user) return null;

  const links =
    user.role === 'farmer' ? farmerLinks :
    user.role === 'buyer' ? buyerLinks :
    user.role === 'procurement_officer' ? procurementLinks :
    adminLinks;

  const unread = getUnreadCount(user.id);

  return (
    <>
      {/* Mobile hamburger button */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 left-4 z-50 bg-primary-700 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isMobile ? 'fixed z-50' : 'relative'}
        ${isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'}
        bg-primary-900 text-white flex flex-col transition-all duration-300
        ${collapsed && !isMobile ? 'w-16' : 'w-64'}
        min-h-screen
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary-700">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold tracking-tight">🌾 FarmWise</h1>
              <p className="text-xs text-primary-300">Sell Smarter. Earn Better.</p>
            </div>
          )}
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-primary-700 text-primary-200"
              aria-label="Toggle sidebar"
            >
              {collapsed ? '→' : '←'}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {links.map(link => {
            const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
            const showBadge = link.to === '/farmer/notifications' || link.to === '/buyer/notifications';
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                }`}
                title={collapsed ? link.label : undefined}
              >
                <span className="text-lg flex-shrink-0">{link.icon}</span>
                {!collapsed && (
                  <span className="flex-1 truncate">{link.label}</span>
                )}
                {!collapsed && showBadge && unread > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-primary-700 p-4">
          {!collapsed && (
            <div className="text-sm mb-2">
              <p className="font-semibold">{user.name}</p>
              <p className="text-primary-300 text-xs capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm bg-primary-800 hover:bg-red-600 text-primary-200 hover:text-white transition-colors"
            title={collapsed ? 'Logout' : undefined}
          >
            {collapsed ? '🚪' : '🚪 Logout'}
          </button>
        </div>
      </aside>
    </>
  );
}
