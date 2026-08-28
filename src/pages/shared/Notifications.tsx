import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function Notifications() {
  const { notifications, markNotificationRead } = useApp();
  const { user } = useAuth();
  const myNotifications = notifications.filter(n => n.userId === user?.id);

  const typeIcon: Record<string, string> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    alert: '🔔',
  };

  const typeColor: Record<string, string> = {
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-amber-50 border-amber-200',
    alert: 'bg-red-50 border-red-200',
  };

  return (
    <div>
      <TopBar title="Notifications" subtitle={`${myNotifications.filter(n => !n.read).length} unread`} />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {myNotifications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="text-4xl mb-3">🔔</div>
            <p className="text-gray-600 font-medium">No notifications</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myNotifications.map(n => (
              <div
                key={n.id}
                onClick={() => !n.read && markNotificationRead(n.id)}
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  n.read ? 'bg-white border-gray-200 opacity-70' : typeColor[n.type] || 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{typeIcon[n.type]}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm">{n.title}</p>
                      {!n.read && <span className="w-2 h-2 bg-primary-500 rounded-full" />}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{n.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
