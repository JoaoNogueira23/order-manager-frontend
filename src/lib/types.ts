import type { LucideIcon } from 'lucide-react';

export interface Table {
  id: string;
  number: number;
  location: string;
  isOccupied: 'false' | 'true';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: 'Drinks' | 'Main Courses' | 'Desserts' | 'Appetizers';
  categoryIcon: LucideIcon;
  description: string;
  dataAiHint?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImageUrl: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  tableId: string;
  tableName: string; // Denormalized for display
  orderTime: string; // ISO string
  status: 'Pending' | 'Preparing' | 'Ready' | 'Served' | 'Paid' | 'Cancelled';
  items: OrderItem[];
  totalAmount: number;
}
