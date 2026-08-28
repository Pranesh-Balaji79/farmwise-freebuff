import { useState, useEffect } from 'react';
import { isOnline, simulateSync, getUnsyncedCount } from '../utils/offline';

export default function OfflineIndicator() {
  const [online, setOnline] = useState(isOnline());
  const [syncing, setSyncing] = useState(false);
  const [unsynced, setUnsynced] = useState(getUnsyncedCount());
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      setShowToast(true);
      // Auto-sync
      setSyncing(true);
      simulateSync().then(() => {
        setSyncing(false);
        setUnsynced(0);
        setTimeout(() => setShowToast(false), 3000);
      });
    };
    const handleOffline = () => {
      setOnline(false);
      setShowToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showToast && online && unsynced === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      {!online && (
        <div className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          📡 Offline — Changes saved locally
          {unsynced > 0 && <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{unsynced} pending</span>}
        </div>
      )}
      {online && syncing && (
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium">
          <span className="animate-spin">⟳</span> Syncing...
        </div>
      )}
      {online && !syncing && showToast && unsynced === 0 && (
        <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium">
          ✅ Synced Successfully
        </div>
      )}
    </div>
  );
}
