import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  ProduceListing,
  BuyerOffer,
  Order,
  ProcurementCentre,
  Slot,
  QueueToken,
  ProcurementRecord,
  Payment,
  Delivery,
  Notification,
} from '../types';
import {
  demoProduceListings,
  demoBuyerOffers,
  demoOrders,
  demoProcurementCentres,
  demoSlots,
  demoQueueTokens,
  demoProcurementRecords,
  demoPayments,
  demoDeliveries,
  demoNotifications,
} from '../data/demo-data';

interface AppState {
  produceListings: ProduceListing[];
  buyerOffers: BuyerOffer[];
  orders: Order[];
  procurementCentres: ProcurementCentre[];
  slots: Slot[];
  queueTokens: QueueToken[];
  procurementRecords: ProcurementRecord[];
  payments: Payment[];
  deliveries: Delivery[];
  notifications: Notification[];
}

interface AppContextType extends AppState {
  // Produce
  addProduce: (listing: ProduceListing) => void;
  // Orders
  acceptOffer: (offer: BuyerOffer, farmerId: string, farmerName: string) => Order;
  advanceOrder: (orderId: string) => void;
  // Procurement
  bookSlot: (slotId: string, farmerId: string, farmerName: string, produce: string, quantity: number) => QueueToken;
  // Queue
  advanceQueue: (centreId: string) => void;
  // Procurement records
  advanceProcurement: (recordId: string) => void;
  // Payments
  completePayment: (paymentId: string) => void;
  // Notifications
  markNotificationRead: (notifId: string) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'read'>) => void;
  // Logistics
  advanceDelivery: (deliveryId: string) => void;
  getUnreadCount: (userId: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

let orderCounter = 1049;
let tokenCounter = 49;

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    produceListings: [...demoProduceListings],
    buyerOffers: [...demoBuyerOffers],
    orders: [...demoOrders],
    procurementCentres: [...demoProcurementCentres],
    slots: [...demoSlots],
    queueTokens: [...demoQueueTokens],
    procurementRecords: [...demoProcurementRecords],
    payments: [...demoPayments],
    deliveries: [...demoDeliveries],
    notifications: [...demoNotifications],
  });

  const addProduce = useCallback((listing: ProduceListing) => {
    setState(s => ({ ...s, produceListings: [listing, ...s.produceListings] }));
  }, []);

  const acceptOffer = useCallback((offer: BuyerOffer, farmerId: string, farmerName: string): Order => {
    orderCounter++;
    const now = new Date().toISOString();
    const newOrder: Order = {
      id: `FW-${orderCounter}`,
      farmerId,
      farmerName,
      buyerId: offer.buyerId,
      buyerName: offer.buyerName,
      produce: offer.produce,
      quantity: offer.quantity,
      unit: offer.unit,
      pricePerUnit: offer.pricePerUnit,
      totalAmount: offer.quantity * offer.pricePerUnit,
      status: 'placed',
      createdAt: now,
      timeline: [
        { status: 'Order Placed', timestamp: now.replace('T', ' ').slice(0, 16), completed: true },
        { status: 'Confirmed', timestamp: '', completed: false },
        { status: 'Logistics Assigned', timestamp: '', completed: false },
        { status: 'Pickup Scheduled', timestamp: '', completed: false },
        { status: 'Picked Up', timestamp: '', completed: false },
        { status: 'In Transit', timestamp: '', completed: false },
        { status: 'Delivered', timestamp: '', completed: false },
        { status: 'Payment Released', timestamp: '', completed: false },
      ],
    };
    setState(s => ({
      ...s,
      orders: [newOrder, ...s.orders],
      buyerOffers: s.buyerOffers.filter(o => o.id !== offer.id),
      notifications: [
        {
          id: `N-${Date.now()}`,
          userId: farmerId,
          title: 'Order Placed',
          message: `Your order FW-${orderCounter} with ${offer.buyerName} has been placed.`,
          type: 'success',
          read: false,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        },
        ...s.notifications,
      ],
    }));
    return newOrder;
  }, []);

  const advanceOrder = useCallback((orderId: string) => {
    const statusOrder: Order['status'][] = [
      'placed', 'confirmed', 'logistics_assigned', 'pickup_scheduled',
      'picked_up', 'in_transit', 'delivered', 'payment_released',
    ];
    setState(s => ({
      ...s,
      orders: s.orders.map(o => {
        if (o.id !== orderId) return o;
        const idx = statusOrder.indexOf(o.status);
        if (idx < 0 || idx >= statusOrder.length - 1) return o;
        const nextStatus = statusOrder[idx + 1];
        const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
        return {
          ...o,
          status: nextStatus,
          timeline: o.timeline.map((t, i) =>
            i === idx + 1 ? { ...t, timestamp: now, completed: true } : t
          ),
        };
      }),
    }));
  }, []);

  const bookSlot = useCallback((slotId: string, farmerId: string, farmerName: string, produce: string, quantity: number): QueueToken => {
    tokenCounter++;
    const slot = state.slots.find(s => s.id === slotId);
    const newToken: QueueToken = {
      id: `QT-${Date.now()}`,
      centreId: slot?.centreId || '',
      farmerId,
      farmerName,
      tokenNumber: tokenCounter,
      status: 'waiting',
      produce,
      quantity,
      bookedTime: slot?.time || '10:00',
    };
    setState(s => ({
      ...s,
      queueTokens: [...s.queueTokens, newToken],
      slots: s.slots.map(sl => sl.id === slotId ? { ...sl, available: false } : sl),
      notifications: [
        {
          id: `N-${Date.now()}`,
          userId: farmerId,
          title: 'Slot Booked',
          message: `Your procurement slot is confirmed. Token: ${tokenCounter}. Time: ${slot?.time || '10:00'}.`,
          type: 'success',
          read: false,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        },
        ...s.notifications,
      ],
    }));
    return newToken;
  }, [state.slots]);

  const advanceQueue = useCallback((centreId: string) => {
    setState(s => {
      const tokens = s.queueTokens.filter(t => t.centreId === centreId);
      const servingIdx = tokens.findIndex(t => t.status === 'serving');
      if (servingIdx >= 0) {
        tokens[servingIdx] = { ...tokens[servingIdx], status: 'completed' };
      }
      const nextWaiting = tokens.find(t => t.status === 'waiting');
      if (nextWaiting) {
        nextWaiting.status = 'serving';
      }
      const farmersAhead = tokens.filter(t => t.status === 'waiting').length;
      const updatedNotifications = nextWaiting ? [
        {
          id: `N-${Date.now()}`,
          userId: nextWaiting.farmerId,
          title: 'Your turn is approaching',
          message: `Please proceed to Counter 2. Token ${nextWaiting.tokenNumber} is now being served.`,
          type: 'alert' as const,
          read: false,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        },
        ...s.notifications,
      ] : s.notifications;

      return {
        ...s,
        queueTokens: s.queueTokens.map(t => {
          if (t.centreId !== centreId) return t;
          const updated = tokens.find(tk => tk.id === t.id);
          return updated || t;
        }),
        notifications: updatedNotifications,
      };
    });
  }, []);

  const advanceProcurement = useCallback((recordId: string) => {
    const statusOrder: ProcurementRecord['status'][] = [
      'registered', 'slot_booked', 'arrived', 'verification',
      'weighing', 'quality_check', 'procurement', 'payment_processing', 'payment_completed',
    ];
    setState(s => ({
      ...s,
      procurementRecords: s.procurementRecords.map(r => {
        if (r.id !== recordId) return r;
        const idx = statusOrder.indexOf(r.status);
        if (idx < 0 || idx >= statusOrder.length - 1) return r;
        const nextStatus = statusOrder[idx + 1];
        const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
        return {
          ...r,
          status: nextStatus,
          timeline: r.timeline.map((t, i) =>
            i === idx + 1 ? { ...t, timestamp: now, completed: true } : t
          ),
        };
      }),
    }));
  }, []);

  const completePayment = useCallback((paymentId: string) => {
    setState(s => ({
      ...s,
      payments: s.payments.map(p =>
        p.id === paymentId
          ? { ...p, status: 'completed' as const, completedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) }
          : p
      ),
    }));
  }, []);

  const advanceDelivery = useCallback((deliveryId: string) => {
    const statusOrder: Delivery['status'][] = [
      'assigned', 'en_route', 'arrived_pickup', 'loaded', 'in_transit', 'arrived_destination', 'delivered',
    ];
    setState(s => ({
      ...s,
      deliveries: s.deliveries.map(d => {
        if (d.id !== deliveryId) return d;
        const idx = statusOrder.indexOf(d.status);
        if (idx < 0 || idx >= statusOrder.length - 1) return d;
        return { ...d, status: statusOrder[idx + 1] };
      }),
    }));
  }, []);

  const markNotificationRead = useCallback((notifId: string) => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => n.id === notifId ? { ...n, read: true } : n),
    }));
  }, []);

  const addNotification = useCallback((notif: Omit<Notification, 'id' | 'read'>) => {
    setState(s => ({
      ...s,
      notifications: [
        { ...notif, id: `N-${Date.now()}`, read: false },
        ...s.notifications,
      ],
    }));
  }, []);

  const getUnreadCount = useCallback((userId: string) => {
    return state.notifications.filter(n => n.userId === userId && !n.read).length;
  }, [state.notifications]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        addProduce,
        acceptOffer,
        advanceOrder,
        bookSlot,
        advanceQueue,
        advanceProcurement,
        completePayment,
        advanceDelivery,
        markNotificationRead,
        addNotification,
        getUnreadCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
