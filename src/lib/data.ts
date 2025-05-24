import type { Table, Product, Order } from './types';
import { Coffee, Utensils, CakeSlice, Soup, Sandwich, Salad, Wine, Beer } from 'lucide-react';

export const mockTables: Table[] = [
  { id: 't1', number: 1, location: 'Patio', status: 'Available', capacity: 4 },
  { id: 't2', number: 2, location: 'Indoors', status: 'Occupied', capacity: 2 },
  { id: 't3', number: 3, location: 'Window Seat', status: 'Reserved', capacity: 4 },
  { id: 't4', number: 4, location: 'Bar', status: 'Available', capacity: 1 },
  { id: 't5', number: 5, location: 'Indoors', status: 'Available', capacity: 6 },
  { id: 't6', number: 10, location: 'VIP Room', status: 'Reserved', capacity: 8 },
  { id: 't7', number: 11, location: 'Garden', status: 'Occupied', capacity: 4 },
  { id: 't8', number: 12, location: 'Rooftop', status: 'Available', capacity: 5 },
];

export const mockProducts: Product[] = [
  { 
    id: 'p1', 
    name: 'Espresso', 
    price: 3.50, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Drinks', 
    categoryIcon: Coffee, 
    description: 'Strong and aromatic single shot espresso.',
    dataAiHint: 'coffee cup'
  },
  { 
    id: 'p2', 
    name: 'Margherita Pizza', 
    price: 12.00, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Main Courses', 
    categoryIcon: Utensils, 
    description: 'Classic Margherita with fresh basil and mozzarella.',
    dataAiHint: 'pizza food'
  },
  { 
    id: 'p3', 
    name: 'Chocolate Lava Cake', 
    price: 7.50, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Desserts', 
    categoryIcon: CakeSlice, 
    description: 'Warm chocolate cake with a gooey molten center.',
    dataAiHint: 'chocolate cake'
  },
  { 
    id: 'p4', 
    name: 'Tomato Soup', 
    price: 6.00, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Appetizers', 
    categoryIcon: Soup, 
    description: 'Creamy tomato soup served with a side of croutons.',
    dataAiHint: 'soup bowl'
  },
  { 
    id: 'p5', 
    name: 'Chicken Caesar Salad', 
    price: 10.50, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Main Courses', 
    categoryIcon: Salad, 
    description: 'Crisp romaine lettuce, grilled chicken, croutons, and Caesar dressing.',
    dataAiHint: 'salad bowl'
  },
  { 
    id: 'p6', 
    name: 'Club Sandwich', 
    price: 9.75, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Main Courses', 
    categoryIcon: Sandwich, 
    description: 'Triple-decker sandwich with turkey, bacon, lettuce, and tomato.',
    dataAiHint: 'sandwich bread'
  },
  { 
    id: 'p7', 
    name: 'Red Wine (Glass)', 
    price: 8.00, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Drinks', 
    categoryIcon: Wine, 
    description: 'A glass of our house special red wine.',
    dataAiHint: 'wine glass'
  },
  { 
    id: 'p8', 
    name: 'Craft Beer', 
    price: 6.50, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Drinks', 
    categoryIcon: Beer, 
    description: 'Locally brewed craft beer, ask for today\'s selection.',
    dataAiHint: 'beer bottle'
  },
  { 
    id: 'p9', 
    name: 'Cheesecake', 
    price: 7.00, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Desserts', 
    categoryIcon: CakeSlice, 
    description: 'Creamy New York style cheesecake with a graham cracker crust.',
    dataAiHint: 'cheesecake slice'
  },
  { 
    id: 'p10', 
    name: 'Bruschetta', 
    price: 7.00, 
    imageUrl: 'https://placehold.co/300x200.png', 
    category: 'Appetizers', 
    categoryIcon: Utensils,  // Using Utensils as a generic starter icon
    description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil.',
    dataAiHint: 'bruschetta appetizer'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    tableId: 't2',
    tableName: 'Table 2 - Indoors',
    orderTime: new Date(Date.now() - 3600 * 1000 * 1.5).toISOString(), // 1.5 hours ago
    status: 'Served',
    items: [
      { id: 'oi1-1', productId: 'p1', productName: 'Espresso', productImageUrl: mockProducts.find(p=>p.id==='p1')?.imageUrl || '', quantity: 1, unitPrice: 3.50, totalPrice: 3.50 },
      { id: 'oi1-2', productId: 'p2', productName: 'Margherita Pizza', productImageUrl: mockProducts.find(p=>p.id==='p2')?.imageUrl || '', quantity: 1, unitPrice: 12.00, totalPrice: 12.00 },
    ],
    totalAmount: 15.50,
  },
  {
    id: 'o2',
    tableId: 't7',
    tableName: 'Table 11 - Garden',
    orderTime: new Date(Date.now() - 3600 * 1000 * 0.5).toISOString(), // 0.5 hours ago
    status: 'Preparing',
    items: [
      { id: 'oi2-1', productId: 'p5', productName: 'Chicken Caesar Salad', productImageUrl: mockProducts.find(p=>p.id==='p5')?.imageUrl || '', quantity: 2, unitPrice: 10.50, totalPrice: 21.00 },
      { id: 'oi2-2', productId: 'p7', productName: 'Red Wine (Glass)', productImageUrl: mockProducts.find(p=>p.id==='p7')?.imageUrl || '', quantity: 2, unitPrice: 8.00, totalPrice: 16.00 },
      { id: 'oi2-3', productId: 'p4', productName: 'Tomato Soup', productImageUrl: mockProducts.find(p=>p.id==='p4')?.imageUrl || '', quantity: 1, unitPrice: 6.00, totalPrice: 6.00 },
    ],
    totalAmount: 43.00,
  },
  {
    id: 'o3',
    tableId: 't2', // Another order for table t2
    tableName: 'Table 2 - Indoors',
    orderTime: new Date(Date.now() - 3600 * 1000 * 0.2).toISOString(), // 12 mins ago
    status: 'Pending',
    items: [
      { id: 'oi3-1', productId: 'p8', productName: 'Craft Beer', productImageUrl: mockProducts.find(p=>p.id==='p8')?.imageUrl || '', quantity: 2, unitPrice: 6.50, totalPrice: 13.00 },
    ],
    totalAmount: 13.00,
  },
  {
    id: 'o4',
    tableId: 't3', 
    tableName: 'Table 3 - Window Seat',
    orderTime: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), // 2 hours ago
    status: 'Paid',
    items: [
      { id: 'oi4-1', productId: 'p6', productName: 'Club Sandwich', productImageUrl: mockProducts.find(p=>p.id==='p6')?.imageUrl || '', quantity: 1, unitPrice: 9.75, totalPrice: 9.75 },
      { id: 'oi4-2', productId: 'p3', productName: 'Chocolate Lava Cake', productImageUrl: mockProducts.find(p=>p.id==='p3')?.imageUrl || '', quantity: 1, unitPrice: 7.50, totalPrice: 7.50 },
    ],
    totalAmount: 17.25,
  }
];

// Helper functions to get data
export const getTableById = (id: string): Table | undefined => mockTables.find(table => table.id === id);
export const getProductById = (id: string): Product | undefined => mockProducts.find(product => product.id === id);
export const getOrderById = (id: string): Order | undefined => mockOrders.find(order => order.id === id);
export const getOrdersByTableId = (tableId: string): Order[] => mockOrders.filter(order => order.tableId === tableId).sort((a,b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime());
