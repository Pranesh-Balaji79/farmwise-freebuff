// ============================================================
// FarmWise Offline Support
// Uses localStorage to save form data when offline
// Syncs when connection is restored
// ============================================================

const OFFLINE_QUEUE_KEY = 'farmwise_offline_queue';
const OFFLINE_STATUS_KEY = 'farmwise_offline_status';

export interface OfflineEntry {
  id: string;
  type: 'produce_listing' | 'slot_booking' | 'order_accept';
  data: Record<string, unknown>;
  timestamp: string;
  synced: boolean;
}

// Check if online
export function isOnline(): boolean {
  return navigator.onLine;
}

// Save to offline queue
export function saveOffline(entry: Omit<OfflineEntry, 'id' | 'timestamp' | 'synced'>): OfflineEntry {
  const queue = getOfflineQueue();
  const newEntry: OfflineEntry = {
    ...entry,
    id: `OFF-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    synced: false,
  };
  queue.push(newEntry);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  return newEntry;
}

// Get all offline entries
export function getOfflineQueue(): OfflineEntry[] {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Mark entry as synced
export function markSynced(entryId: string): void {
  const queue = getOfflineQueue();
  const updated = queue.map(e => e.id === entryId ? { ...e, synced: true } : e);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(updated));
}

// Get unsynced count
export function getUnsyncedCount(): number {
  return getOfflineQueue().filter(e => !e.synced).length;
}

// Set online/offline status display
export function setOnlineStatus(status: 'online' | 'offline' | 'syncing'): void {
  localStorage.setItem(OFFLINE_STATUS_KEY, status);
}

// Get online/offline status
export function getOnlineStatus(): string {
  return localStorage.getItem(OFFLINE_STATUS_KEY) || 'online';
}

// Simulate sync for demo
export function simulateSync(): Promise<void> {
  return new Promise((resolve) => {
    setOnlineStatus('syncing');
    setTimeout(() => {
      const queue = getOfflineQueue();
      queue.forEach(e => { e.synced = true; });
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
      setOnlineStatus('online');
      resolve();
    }, 1500);
  });
}
