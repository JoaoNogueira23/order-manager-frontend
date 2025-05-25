import type { LucideIcon } from 'lucide-react';
import internal from 'stream';

export interface Table {
  id_table: string;
  table_number: number;
  location: string;
  status: 'Livre' | 'Ocupada' | 'Reservada';
  capacity: number;
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
  total_price: number;
  quantity: number;
  product_name: string;
}

export interface Order {
  order_rank: number;
  id_order: string;
  id_table: string;
  id_section: string;
  order_time: string;
  status: 'Pendente' | 'Preparando' | 'Entregue' | 'Cancelado' ;
  quantity: number;
}
