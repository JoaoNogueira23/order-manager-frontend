import type { LucideIcon } from 'lucide-react';
import internal from 'stream';

export interface Table {
  id_table: string;
  table_number: number;
  location: string;
  status?: 'Livre' | 'Ocupada' | 'Reservada';
  capacity: number;
}

export interface Product {
  id_product: string;
  name: string;
  price: number;
  voulume: number;
  describe: string;
  isactive: boolean;
  Ispromotion: boolean;
  url_image: string;
  category: 'Bebidas' | 'Sobremesa' | 'Aperitivos';
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


export interface ResponseAPI {
  status: number;
  message: string;
  data?: any; // Use 'any' for flexibility, or define a more specific type if needed
}
