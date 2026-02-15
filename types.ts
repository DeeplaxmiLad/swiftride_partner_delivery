
export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  PICKED_UP = 'PICKED_UP',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum UserRole {
  RIDER = 'RIDER',
  ADMIN = 'ADMIN'
}

export interface Order {
  id: string;
  customerName: string;
  restaurantName: string;
  pickupAddress: string;
  deliveryAddress: string;
  items: string[];
  totalAmount: number;
  riderEarnings: number;
  status: OrderStatus;
  timestamp: string;
  distance: string;
  customerLat: number;
  customerLng: number;
  restLat: number;
  restLng: number;
}

export interface RiderProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: 'Bike' | 'Scooter' | 'Cycle';
  vehicleNumber: string;
  rating: number;
  isOnline: boolean;
  walletBalance: number;
  documentsVerified: boolean;
  totalDeliveries: number;
}

export interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}
