import type {
  Farmer,
  Buyer,
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
  DemandRecord,
  AdminStats,
} from '../types';

// ============================================================
// DEMO FARMERS
// ============================================================
export const demoFarmers: Farmer[] = [
  {
    id: 'F001',
    name: 'Ravi Kumar',
    mobile: '+91 98765 43210',
    farmerId: 'TN-SLM-2024-0847',
    state: 'Tamil Nadu',
    district: 'Salem',
    village: 'Mettur',
    fpo: 'Salem District Farmers Collective',
    mainCrops: ['Rice', 'Groundnut'],
    preferredLanguage: 'Tamil',
    totalSales: 24,
    totalEarnings: 342000,
  },
  {
    id: 'F002',
    name: 'Lakshmi Devi',
    mobile: '+91 97654 32109',
    farmerId: 'TN-MLP-2024-1203',
    state: 'Tamil Nadu',
    district: 'Madurai',
    village: 'Vadipatti',
    fpo: 'Madurai Farmers Producer Org',
    mainCrops: ['Turmeric', 'Onion'],
    preferredLanguage: 'Tamil',
    totalSales: 18,
    totalEarnings: 215000,
  },
  {
    id: 'F003',
    name: 'Suresh Patel',
    mobile: '+91 96543 21098',
    farmerId: 'GJ-ANR-2024-0562',
    state: 'Gujarat',
    district: 'Anand',
    village: 'Anklav',
    fpo: 'Gujarat Agri Producers',
    mainCrops: ['Cotton', 'Groundnut'],
    preferredLanguage: 'Hindi',
    totalSales: 31,
    totalEarnings: 520000,
  },
];

// ============================================================
// DEMO BUYERS
// ============================================================
export const demoBuyers: Buyer[] = [
  {
    id: 'B001',
    name: 'Arun Mehta',
    company: 'ABC Foods Pvt Ltd',
    mobile: '+91 91234 56780',
    location: 'Chennai',
    rating: 4.5,
    totalOrders: 156,
    type: 'company',
  },
  {
    id: 'B002',
    name: 'Priya Sharma',
    company: 'FreshHarvest Direct',
    mobile: '+91 92345 67891',
    location: 'Bangalore',
    rating: 4.8,
    totalOrders: 234,
    type: 'company',
  },
  {
    id: 'B003',
    name: 'Kumar Rajan',
    company: 'GreenLeaf Traders',
    mobile: '+91 93456 78902',
    location: 'Coimbatore',
    rating: 4.2,
    totalOrders: 89,
    type: 'individual',
  },
  {
    id: 'B004',
    name: 'Meena Iyer',
    company: 'TamilNadu Food Corp',
    mobile: '+91 94567 89013',
    location: 'Salem',
    rating: 4.6,
    totalOrders: 312,
    type: 'fpo',
  },
];

// ============================================================
// PRODUCE LISTINGS
// ============================================================
export const demoProduceListings: ProduceListing[] = [
  {
    id: 'PL001',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    produce: 'Rice',
    variety: 'Ponni',
    quantity: 1000,
    unit: 'kg',
    grade: 'A',
    harvestDate: '2026-08-20',
    expectedPrice: 28,
    availableDate: '2026-08-28',
    location: 'Mettur, Salem',
    status: 'available',
  },
  {
    id: 'PL002',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    produce: 'Groundnut',
    variety: 'Bold',
    quantity: 500,
    unit: 'kg',
    grade: 'A',
    harvestDate: '2026-08-18',
    expectedPrice: 65,
    availableDate: '2026-08-28',
    location: 'Mettur, Salem',
    status: 'available',
  },
  {
    id: 'PL003',
    farmerId: 'F002',
    farmerName: 'Lakshmi Devi',
    produce: 'Turmeric',
    variety: 'Erode',
    quantity: 300,
    unit: 'kg',
    grade: 'A',
    harvestDate: '2026-08-15',
    expectedPrice: 180,
    availableDate: '2026-08-25',
    location: 'Vadipatti, Madurai',
    status: 'available',
  },
  {
    id: 'PL004',
    farmerId: 'F002',
    farmerName: 'Lakshmi Devi',
    produce: 'Onion',
    variety: 'Red',
    quantity: 800,
    unit: 'kg',
    grade: 'B',
    harvestDate: '2026-08-22',
    expectedPrice: 22,
    availableDate: '2026-08-28',
    location: 'Vadipatti, Madurai',
    status: 'available',
  },
  {
    id: 'PL005',
    farmerId: 'F003',
    farmerName: 'Suresh Patel',
    produce: 'Cotton',
    variety: 'BT Cotton',
    quantity: 2000,
    unit: 'kg',
    grade: 'A',
    harvestDate: '2026-08-10',
    expectedPrice: 72,
    availableDate: '2026-08-26',
    location: 'Anklav, Anand',
    status: 'available',
  },
];

// ============================================================
// BUYER OFFERS
// ============================================================
export const demoBuyerOffers: BuyerOffer[] = [
  {
    id: 'BO001',
    buyerId: 'B001',
    buyerName: 'ABC Foods Pvt Ltd',
    buyerRating: 4.5,
    produce: 'Rice',
    quantity: 500,
    pricePerUnit: 27,
    unit: 'kg',
    pickupDate: '2026-08-30',
    deliveryRequirement: 'Buyer pickup',
    location: 'Chennai',
    logisticsEstimate: 800,
  },
  {
    id: 'BO002',
    buyerId: 'B002',
    buyerName: 'FreshHarvest Direct',
    buyerRating: 4.8,
    produce: 'Rice',
    quantity: 1000,
    pricePerUnit: 29,
    unit: 'kg',
    pickupDate: '2026-08-29',
    deliveryRequirement: 'Farmer delivery',
    location: 'Bangalore',
    logisticsEstimate: 2000,
  },
  {
    id: 'BO003',
    buyerId: 'B003',
    buyerName: 'GreenLeaf Traders',
    buyerRating: 4.2,
    produce: 'Rice',
    quantity: 700,
    pricePerUnit: 28,
    unit: 'kg',
    pickupDate: '2026-08-31',
    deliveryRequirement: 'Buyer pickup',
    location: 'Coimbatore',
    logisticsEstimate: 1200,
  },
  {
    id: 'BO004',
    buyerId: 'B004',
    buyerName: 'TamilNadu Food Corp',
    buyerRating: 4.6,
    produce: 'Rice',
    quantity: 1200,
    pricePerUnit: 26,
    unit: 'kg',
    pickupDate: '2026-08-29',
    deliveryRequirement: 'Buyer pickup',
    location: 'Salem',
    logisticsEstimate: 500,
  },
  {
    id: 'BO005',
    buyerId: 'B001',
    buyerName: 'ABC Foods Pvt Ltd',
    buyerRating: 4.5,
    produce: 'Groundnut',
    quantity: 500,
    pricePerUnit: 62,
    unit: 'kg',
    pickupDate: '2026-08-31',
    deliveryRequirement: 'Buyer pickup',
    location: 'Chennai',
    logisticsEstimate: 1000,
  },
  {
    id: 'BO006',
    buyerId: 'B002',
    buyerName: 'FreshHarvest Direct',
    buyerRating: 4.8,
    produce: 'Turmeric',
    quantity: 300,
    pricePerUnit: 175,
    unit: 'kg',
    pickupDate: '2026-08-30',
    deliveryRequirement: 'Farmer delivery',
    location: 'Bangalore',
    logisticsEstimate: 1500,
  },
];

// ============================================================
// ORDERS
// ============================================================
export const demoOrders: Order[] = [
  {
    id: 'FW-1048',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    buyerId: 'B002',
    buyerName: 'FreshHarvest Direct',
    produce: 'Rice',
    quantity: 1000,
    unit: 'kg',
    pricePerUnit: 29,
    totalAmount: 29000,
    status: 'confirmed',
    createdAt: '2026-08-26T10:30:00',
    logisticsId: 'LOG001',
    timeline: [
      { status: 'Order Placed', timestamp: '2026-08-26 10:30', completed: true },
      { status: 'Confirmed', timestamp: '2026-08-26 11:15', completed: true },
      { status: 'Logistics Assigned', timestamp: '', completed: false },
      { status: 'Pickup Scheduled', timestamp: '', completed: false },
      { status: 'Picked Up', timestamp: '', completed: false },
      { status: 'In Transit', timestamp: '', completed: false },
      { status: 'Delivered', timestamp: '', completed: false },
      { status: 'Payment Released', timestamp: '', completed: false },
    ],
  },
  {
    id: 'FW-1045',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    buyerId: 'B003',
    buyerName: 'GreenLeaf Traders',
    produce: 'Groundnut',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 62,
    totalAmount: 31000,
    status: 'in_transit',
    createdAt: '2026-08-24T09:00:00',
    logisticsId: 'LOG002',
    paymentId: 'PAY002',
    timeline: [
      { status: 'Order Placed', timestamp: '2026-08-24 09:00', completed: true },
      { status: 'Confirmed', timestamp: '2026-08-24 09:45', completed: true },
      { status: 'Logistics Assigned', timestamp: '2026-08-24 10:30', completed: true },
      { status: 'Pickup Scheduled', timestamp: '2026-08-25 08:00', completed: true },
      { status: 'Picked Up', timestamp: '2026-08-25 08:30', completed: true },
      { status: 'In Transit', timestamp: '2026-08-25 09:00', completed: true },
      { status: 'Delivered', timestamp: '', completed: false },
      { status: 'Payment Released', timestamp: '', completed: false },
    ],
  },
];

// ============================================================
// PROCUREMENT CENTRES
// ============================================================
export const demoProcurementCentres: ProcurementCentre[] = [
  {
    id: 'PC001',
    name: 'Salem District Procurement Centre',
    address: '23, Trichy Road, Salem, TN',
    distance: 8,
    status: 'open',
    availableSlots: 24,
    totalSlots: 40,
    estimatedWait: 25,
    lat: 11.6643,
    lng: 78.146,
  },
  {
    id: 'PC002',
    name: 'Mettur Agricultural Market Yard',
    address: '12, Mettur Dam Road, Salem, TN',
    distance: 14,
    status: 'open',
    availableSlots: 10,
    totalSlots: 30,
    estimatedWait: 50,
    lat: 11.788,
    lng: 77.835,
  },
  {
    id: 'PC003',
    name: 'Namakkal Procurement Hub',
    address: '5, NH-44, Namakkal, TN',
    distance: 32,
    status: 'busy',
    availableSlots: 3,
    totalSlots: 35,
    estimatedWait: 85,
    lat: 11.2173,
    lng: 78.1685,
  },
  {
    id: 'PC004',
    name: 'Erode Government Procurement Centre',
    address: '7, Perundurai Road, Erode, TN',
    distance: 48,
    status: 'open',
    availableSlots: 18,
    totalSlots: 25,
    estimatedWait: 15,
    lat: 11.341,
    lng: 77.717,
  },
];

// ============================================================
// SLOTS
// ============================================================
export const demoSlots: Slot[] = [
  { id: 'S001', centreId: 'PC001', centreName: 'Salem District Procurement Centre', date: '2026-08-29', time: '09:00', available: true },
  { id: 'S002', centreId: 'PC001', centreName: 'Salem District Procurement Centre', date: '2026-08-29', time: '09:30', available: true },
  { id: 'S003', centreId: 'PC001', centreName: 'Salem District Procurement Centre', date: '2026-08-29', time: '10:00', available: false },
  { id: 'S004', centreId: 'PC001', centreName: 'Salem District Procurement Centre', date: '2026-08-29', time: '10:30', available: true },
  { id: 'S005', centreId: 'PC001', centreName: 'Salem District Procurement Centre', date: '2026-08-29', time: '11:00', available: true },
  { id: 'S006', centreId: 'PC001', centreName: 'Salem District Procurement Centre', date: '2026-08-30', time: '09:00', available: true },
  { id: 'S007', centreId: 'PC001', centreName: 'Salem District Procurement Centre', date: '2026-08-30', time: '09:30', available: true },
  { id: 'S008', centreId: 'PC002', centreName: 'Mettur Agricultural Market Yard', date: '2026-08-29', time: '09:00', available: true },
  { id: 'S009', centreId: 'PC002', centreName: 'Mettur Agricultural Market Yard', date: '2026-08-29', time: '10:00', available: false },
  { id: 'S010', centreId: 'PC002', centreName: 'Mettur Agricultural Market Yard', date: '2026-08-29', time: '11:00', available: true },
];

// ============================================================
// QUEUE TOKENS
// ============================================================
export const demoQueueTokens: QueueToken[] = [
  { id: 'QT001', centreId: 'PC001', farmerId: 'F002', farmerName: 'Lakshmi Devi', tokenNumber: 41, status: 'serving', produce: 'Turmeric', quantity: 200, bookedTime: '09:00' },
  { id: 'QT002', centreId: 'PC001', farmerId: 'F003', farmerName: 'Suresh Patel', tokenNumber: 42, status: 'waiting', produce: 'Cotton', quantity: 500, bookedTime: '09:30' },
  { id: 'QT003', centreId: 'PC001', farmerId: 'F001', farmerName: 'Ravi Kumar', tokenNumber: 43, status: 'waiting', produce: 'Rice', quantity: 400, bookedTime: '10:00' },
  { id: 'QT004', centreId: 'PC001', farmerId: 'F001', farmerName: 'Ravi Kumar', tokenNumber: 48, status: 'waiting', produce: 'Rice', quantity: 1000, bookedTime: '10:30' },
  { id: 'QT005', centreId: 'PC001', farmerId: 'F002', farmerName: 'Lakshmi Devi', tokenNumber: 44, status: 'waiting', produce: 'Onion', quantity: 300, bookedTime: '10:00' },
  { id: 'QT006', centreId: 'PC001', farmerId: 'F003', farmerName: 'Suresh Patel', tokenNumber: 45, status: 'waiting', produce: 'Groundnut', quantity: 200, bookedTime: '10:00' },
  { id: 'QT007', centreId: 'PC001', farmerId: 'F002', farmerName: 'Lakshmi Devi', tokenNumber: 46, status: 'waiting', produce: 'Turmeric', quantity: 100, bookedTime: '10:30' },
  { id: 'QT008', centreId: 'PC001', farmerId: 'F003', farmerName: 'Suresh Patel', tokenNumber: 47, status: 'waiting', produce: 'Cotton', quantity: 350, bookedTime: '10:30' },
];

// ============================================================
// PROCUREMENT RECORDS
// ============================================================
export const demoProcurementRecords: ProcurementRecord[] = [
  {
    id: 'PR-2041',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    centreId: 'PC001',
    centreName: 'Salem District Procurement Centre',
    produce: 'Rice',
    quantity: 800,
    grade: 'A',
    pricePerUnit: 25,
    totalAmount: 20000,
    status: 'payment_processing',
    tokenNumber: 32,
    date: '2026-08-25',
    timeline: [
      { status: 'registered', label: 'Registration', timestamp: '2026-08-25 08:00', completed: true },
      { status: 'slot_booked', label: 'Slot Booked', timestamp: '2026-08-25 08:05', completed: true },
      { status: 'arrived', label: 'Arrived', timestamp: '2026-08-25 09:20', completed: true },
      { status: 'verification', label: 'Verification', timestamp: '2026-08-25 09:45', completed: true },
      { status: 'weighing', label: 'Weighing', timestamp: '2026-08-25 10:10', completed: true },
      { status: 'quality_check', label: 'Quality Check', timestamp: '2026-08-25 10:30', completed: true },
      { status: 'procurement', label: 'Procurement', timestamp: '2026-08-25 10:45', completed: true },
      { status: 'payment_processing', label: 'Payment Processing', timestamp: '2026-08-25 11:00', completed: true },
      { status: 'payment_completed', label: 'Payment Completed', timestamp: '', completed: false },
    ],
  },
  {
    id: 'PR-2038',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    centreId: 'PC001',
    centreName: 'Salem District Procurement Centre',
    produce: 'Groundnut',
    quantity: 400,
    grade: 'A',
    pricePerUnit: 60,
    totalAmount: 24000,
    status: 'payment_completed',
    tokenNumber: 28,
    date: '2026-08-20',
    timeline: [
      { status: 'registered', label: 'Registration', timestamp: '2026-08-20 08:00', completed: true },
      { status: 'slot_booked', label: 'Slot Booked', timestamp: '2026-08-20 08:05', completed: true },
      { status: 'arrived', label: 'Arrived', timestamp: '2026-08-20 09:15', completed: true },
      { status: 'verification', label: 'Verification', timestamp: '2026-08-20 09:40', completed: true },
      { status: 'weighing', label: 'Weighing', timestamp: '2026-08-20 10:05', completed: true },
      { status: 'quality_check', label: 'Quality Check', timestamp: '2026-08-20 10:25', completed: true },
      { status: 'procurement', label: 'Procurement', timestamp: '2026-08-20 10:40', completed: true },
      { status: 'payment_processing', label: 'Payment Processing', timestamp: '2026-08-20 11:00', completed: true },
      { status: 'payment_completed', label: 'Payment Completed', timestamp: '2026-08-21 09:00', completed: true },
    ],
  },
];

// ============================================================
// PAYMENTS
// ============================================================
export const demoPayments: Payment[] = [
  {
    id: 'PAY001',
    referenceType: 'procurement',
    referenceId: 'PR-2041',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    amount: 20000,
    status: 'processing',
    method: 'NEFT',
    createdAt: '2026-08-25 11:00',
  },
  {
    id: 'PAY002',
    referenceType: 'order',
    referenceId: 'FW-1045',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    amount: 31000,
    status: 'completed',
    method: 'UPI',
    createdAt: '2026-08-25 14:00',
    completedAt: '2026-08-26 09:00',
  },
  {
    id: 'PAY003',
    referenceType: 'procurement',
    referenceId: 'PR-2038',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    amount: 24000,
    status: 'completed',
    method: 'NEFT',
    createdAt: '2026-08-20 11:00',
    completedAt: '2026-08-21 09:00',
  },
  {
    id: 'PAY004',
    referenceType: 'order',
    referenceId: 'FW-1048',
    farmerId: 'F001',
    farmerName: 'Ravi Kumar',
    amount: 29000,
    status: 'pending',
    method: 'NEFT',
    createdAt: '2026-08-26 10:30',
  },
];

// ============================================================
// DELIVERIES
// ============================================================
export const demoDeliveries: Delivery[] = [
  {
    id: 'LOG001',
    orderId: 'FW-1048',
    vehicleNumber: 'TN-38-AB-1234',
    driverName: 'Murugan',
    driverPhone: '+91 87654 32100',
    pickupLocation: 'Mettur, Salem',
    destination: 'Bangalore',
    status: 'assigned',
    eta: '4h 30m',
    lat: 11.664,
    lng: 78.146,
  },
  {
    id: 'LOG002',
    orderId: 'FW-1045',
    vehicleNumber: 'TN-45-CD-5678',
    driverName: 'Karthik',
    driverPhone: '+91 86543 21098',
    pickupLocation: 'Mettur, Salem',
    destination: 'Coimbatore',
    status: 'in_transit',
    eta: '2h 20m',
    lat: 11.45,
    lng: 77.75,
  },
];

// ============================================================
// NOTIFICATIONS
// ============================================================
export const demoNotifications: Notification[] = [
  {
    id: 'N001',
    userId: 'F001',
    title: 'Order Confirmed',
    message: 'FreshHarvest Direct has accepted your rice order FW-1048.',
    type: 'success',
    read: false,
    timestamp: '2026-08-26 11:15',
  },
  {
    id: 'N002',
    userId: 'F001',
    title: 'Payment Processing',
    message: 'Your payment of ₹20,000 from procurement PR-2041 is being processed.',
    type: 'info',
    read: false,
    timestamp: '2026-08-25 11:00',
  },
  {
    id: 'N003',
    userId: 'F001',
    title: 'Payment Received',
    message: '₹31,000 has been credited to your account for order FW-1045.',
    type: 'success',
    read: true,
    timestamp: '2026-08-26 09:00',
  },
  {
    id: 'N004',
    userId: 'F001',
    title: 'Your turn is approaching',
    message: 'Only 3 farmers are ahead of you at Salem Procurement Centre.',
    type: 'warning',
    read: false,
    timestamp: '2026-08-28 10:00',
  },
  {
    id: 'N005',
    userId: 'F001',
    title: 'Slot Booked',
    message: 'Your procurement slot at Salem District Centre is confirmed for 29 Aug, 10:30 AM.',
    type: 'info',
    read: true,
    timestamp: '2026-08-27 15:00',
  },
  {
    id: 'N006',
    userId: 'F001',
    title: 'Smart Recommendation',
    message: 'Direct Buyer B could provide approximately ₹1,500 higher estimated net value for your current rice stock.',
    type: 'info',
    read: false,
    timestamp: '2026-08-28 08:00',
  },
  {
    id: 'N007',
    userId: 'B002',
    title: 'New Produce Available',
    message: 'Ravi Kumar listed 1000 kg Rice (Grade A) in Mettur.',
    type: 'info',
    read: true,
    timestamp: '2026-08-26 09:00',
  },
  {
    id: 'N008',
    userId: 'PC001',
    title: 'High demand today',
    message: '24 farmers are expected. Average wait time: 25 minutes.',
    type: 'warning',
    read: true,
    timestamp: '2026-08-28 08:00',
  },
];

// ============================================================
// DEMAND DATA
// ============================================================
export const demoDemandData: DemandRecord[] = [
  { month: 'Jan', demand: 100, forecast: 105 },
  { month: 'Feb', demand: 120, forecast: 125 },
  { month: 'Mar', demand: 140, forecast: 148 },
  { month: 'Apr', demand: 155, forecast: 162 },
  { month: 'May', demand: 170, forecast: 175 },
  { month: 'Jun', demand: 145, forecast: 152 },
  { month: 'Jul', demand: 130, forecast: 140 },
  { month: 'Aug', demand: 160, forecast: 170 },
  { month: 'Sep', demand: 0, forecast: 180 },
  { month: 'Oct', demand: 0, forecast: 195 },
  { month: 'Nov', demand: 0, forecast: 210 },
  { month: 'Dec', demand: 0, forecast: 200 },
];

// ============================================================
// ADMIN STATS
// ============================================================
export const demoAdminStats: AdminStats = {
  totalFarmers: 1247,
  activeBuyers: 89,
  marketplaceOrders: 342,
  procurementCompleted: 236,
  pendingPayments: 45,
  avgWaitTime: 28,
  totalEarnings: 4520000,
  marketplaceTransactions: 184,
};

// ============================================================
// CHART DATA FOR ADMIN
// ============================================================
export const farmerActivityData = [
  { month: 'Jan', farmers: 850, orders: 180 },
  { month: 'Feb', farmers: 920, orders: 210 },
  { month: 'Mar', farmers: 1050, orders: 265 },
  { month: 'Apr', farmers: 1100, orders: 290 },
  { month: 'May', farmers: 1180, orders: 310 },
  { month: 'Jun', farmers: 1200, orders: 325 },
  { month: 'Jul', farmers: 1220, orders: 335 },
  { month: 'Aug', farmers: 1247, orders: 342 },
];

export const produceVolumeData = [
  { month: 'Jan', rice: 45, wheat: 30, cotton: 20, turmeric: 5 },
  { month: 'Feb', rice: 50, wheat: 35, cotton: 22, turmeric: 8 },
  { month: 'Mar', rice: 55, wheat: 40, cotton: 25, turmeric: 10 },
  { month: 'Apr', rice: 60, wheat: 38, cotton: 28, turmeric: 12 },
  { month: 'May', rice: 58, wheat: 35, cotton: 30, turmeric: 11 },
  { month: 'Jun', rice: 52, wheat: 32, cotton: 26, turmeric: 9 },
  { month: 'Jul', rice: 48, wheat: 28, cotton: 22, turmeric: 7 },
  { month: 'Aug', rice: 65, wheat: 42, cotton: 32, turmeric: 14 },
];

export const earningsData = [
  { month: 'Jan', marketplace: 180000, procurement: 220000 },
  { month: 'Feb', marketplace: 210000, procurement: 250000 },
  { month: 'Mar', marketplace: 265000, procurement: 280000 },
  { month: 'Apr', marketplace: 290000, procurement: 310000 },
  { month: 'May', marketplace: 310000, procurement: 330000 },
  { month: 'Jun', marketplace: 325000, procurement: 300000 },
  { month: 'Jul', marketplace: 335000, procurement: 290000 },
  { month: 'Aug', marketplace: 342000, procurement: 350000 },
];

export const waitingTimeData = [
  { month: 'Jan', avgWait: 55 },
  { month: 'Feb', avgWait: 52 },
  { month: 'Mar', avgWait: 48 },
  { month: 'Apr', avgWait: 42 },
  { month: 'May', avgWait: 38 },
  { month: 'Jun', avgWait: 35 },
  { month: 'Jul', avgWait: 32 },
  { month: 'Aug', avgWait: 28 },
];

// ============================================================
// GOVERNMENT PROCUREMENT PRICE
// ============================================================
export const govtProcurementPrice: Record<string, number> = {
  Rice: 25,
  Wheat: 22,
  Groundnut: 60,
  Turmeric: 150,
  Cotton: 65,
  Onion: 18,
  Tomato: 15,
  Potato: 12,
};
