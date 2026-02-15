
import { Order, OrderStatus, RiderProfile, Transaction } from './types';

export const MOCK_RIDER: RiderProfile = {
  id: 'RIDER-PNV-001',
  name: 'Rajesh Kumar',
  email: 'rajesh.pnv@swiftride.in',
  phone: '+91 98765 43210',
  vehicleType: 'Bike',
  vehicleNumber: 'MH-46-BK-2024',
  rating: 4.9,
  isOnline: true,
  walletBalance: 1250.50,
  documentsVerified: true,
  totalDeliveries: 450
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-PNV-101',
    customerName: 'Anjali Sharma',
    restaurantName: 'Hotel Visawa, Panvel',
    pickupAddress: 'Near Panvel Railway Station, Panvel',
    deliveryAddress: 'Orion Mall Area, New Panvel',
    items: ['Paneer Tikka Masala', 'Butter Naan', 'Jeera Rice'],
    totalAmount: 450,
    riderEarnings: 45,
    status: OrderStatus.PENDING,
    timestamp: new Date().toISOString(),
    distance: '1.2 km',
    restLat: 18.9894,
    restLng: 73.1175,
    customerLat: 19.0012,
    customerLng: 73.1023
  },
  {
    id: 'ORD-PNV-102',
    customerName: 'Vikram Singh',
    restaurantName: 'Khandeshwar Delights',
    pickupAddress: 'Sector 10, Khandeshwar',
    deliveryAddress: 'MGM Hospital Campus, Kalamboli',
    items: ['Chicken Biryani Family Pack', 'Raita'],
    totalAmount: 820,
    riderEarnings: 65,
    status: OrderStatus.PENDING,
    timestamp: new Date().toISOString(),
    distance: '3.8 km',
    restLat: 19.0125,
    restLng: 73.0988,
    customerLat: 19.0344,
    customerLng: 73.1055
  },
  {
    id: 'ORD-PNV-103',
    customerName: 'Priya Patil',
    restaurantName: 'Natural Ice Cream',
    pickupAddress: 'Sector 15, New Panvel',
    deliveryAddress: 'Cidco Colony, Sukapur',
    items: ['Sitaphal Scoop x2', 'Choco Bite'],
    totalAmount: 280,
    riderEarnings: 35,
    status: OrderStatus.PENDING,
    timestamp: new Date().toISOString(),
    distance: '2.5 km',
    restLat: 18.9950,
    restLng: 73.1250,
    customerLat: 18.9810,
    customerLng: 73.1420
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TXN-001', type: 'CREDIT', amount: 45.00, description: 'Delivery: Hotel Visawa', date: '2023-11-01T12:00:00Z', status: 'SUCCESS' },
  { id: 'TXN-002', type: 'CREDIT', amount: 65.00, description: 'Delivery: Khandeshwar Delights', date: '2023-11-01T14:30:00Z', status: 'SUCCESS' },
  { id: 'TXN-003', type: 'DEBIT', amount: 500.00, description: 'Bank Payout - HDFC', date: '2023-10-31T10:00:00Z', status: 'SUCCESS' },
];
