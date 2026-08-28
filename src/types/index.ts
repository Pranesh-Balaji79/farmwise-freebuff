// ============================================================
// FarmWise Type Definitions
// ============================================================

export type UserRole = 'farmer' | 'buyer' | 'procurement_officer' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  mobile: string;
  avatar?: string;
}

// ---- Farmer ----
export interface Farmer {
  id: string;
  name: string;
  mobile: string;
  farmerId: string;
  state: string;
  district: string;
  village: string;
  fpo?: string;
  mainCrops: string[];
  preferredLanguage: string;
  totalSales: number;
  totalEarnings: number;
  profileImage?: string;
}

// ---- Buyer ----
export interface Buyer {
  id: string;
  name: string;
  company: string;
  mobile: string;
  location: string;
  rating: number;
  totalOrders: number;
  type: 'individual' | 'company' | 'fpo';
}

// ---- Produce ----
export type ProduceStatus = 'available' | 'reserved' | 'sold' | 'procured';

export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  produce: string;
  variety: string;
  quantity: number;
  unit: string;
  grade: string;
  harvestDate: string;
  expectedPrice: number;
  availableDate: string;
  location: string;
  status: ProduceStatus;
  image?: string;
}

// ---- Buyer Offers ----
export interface BuyerOffer {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerRating: number;
  produce: string;
  quantity: number;
  pricePerUnit: number;
  unit: string;
  pickupDate: string;
  deliveryRequirement: string;
  location: string;
  logisticsEstimate: number;
}

// ---- Orders ----
export type OrderStatus = 'placed' | 'confirmed' | 'logistics_assigned' | 'pickup_scheduled' | 'picked_up' | 'in_transit' | 'delivered' | 'payment_released' | 'completed';

export interface Order {
  id: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  produce: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  timeline: OrderTimelineEvent[];
  logisticsId?: string;
  paymentId?: string;
}

export interface OrderTimelineEvent {
  status: string;
  timestamp: string;
  completed: boolean;
}

// ---- Procurement ----
export interface ProcurementCentre {
  id: string;
  name: string;
  address: string;
  distance: number;
  status: 'open' | 'closed' | 'busy';
  availableSlots: number;
  totalSlots: number;
  estimatedWait: number;
  lat: number;
  lng: number;
}

export interface Slot {
  id: string;
  centreId: string;
  centreName: string;
  date: string;
  time: string;
  available: boolean;
}

export interface QueueToken {
  id: string;
  centreId: string;
  farmerId: string;
  farmerName: string;
  tokenNumber: number;
  status: 'waiting' | 'serving' | 'completed' | 'no_show';
  produce: string;
  quantity: number;
  bookedTime: string;
}

export type ProcurementStatus = 'registered' | 'slot_booked' | 'arrived' | 'verification' | 'weighing' | 'quality_check' | 'procurement' | 'payment_processing' | 'payment_completed';

export interface ProcurementRecord {
  id: string;
  farmerId: string;
  farmerName: string;
  centreId: string;
  centreName: string;
  produce: string;
  quantity: number;
  grade: string;
  pricePerUnit: number;
  totalAmount: number;
  status: ProcurementStatus;
  tokenNumber: number;
  date: string;
  timeline: ProcurementTimelineEvent[];
}

export interface ProcurementTimelineEvent {
  status: ProcurementStatus;
  label: string;
  timestamp: string;
  completed: boolean;
}

// ---- Payments ----
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Payment {
  id: string;
  referenceType: 'order' | 'procurement';
  referenceId: string;
  farmerId: string;
  farmerName: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  createdAt: string;
  completedAt?: string;
}

// ---- Logistics ----
export type DeliveryStatus = 'assigned' | 'en_route' | 'arrived_pickup' | 'loaded' | 'in_transit' | 'arrived_destination' | 'delivered';

export interface Delivery {
  id: string;
  orderId: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  pickupLocation: string;
  destination: string;
  status: DeliveryStatus;
  eta: string;
  lat: number;
  lng: number;
}

// ---- Notifications ----
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  timestamp: string;
}

// ---- Demand ----
export interface DemandRecord {
  month: string;
  demand: number;
  forecast?: number;
}

// ---- Analytics ----
export interface AdminStats {
  totalFarmers: number;
  activeBuyers: number;
  marketplaceOrders: number;
  procurementCompleted: number;
  pendingPayments: number;
  avgWaitTime: number;
  totalEarnings: number;
  marketplaceTransactions: number;
}
