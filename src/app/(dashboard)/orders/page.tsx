import OrdersClient from '@/components/orders/OrdersClient';
import { getHandlesAPI } from '@/lib/api';
import type { Order, Table } from '@/lib/types';

export const metadata = {
  title: 'Orders - MesaFacil',
};

async function getActiveOrders(): Promise<{orders: Order[]; tables: Table[]}> {
  const { getTables, getOrders } = getHandlesAPI();
  const tables = await getTables();
  const ordersLists = await Promise.all(
    tables.map((t) => getOrders(t.id_table))
  );
  const orders = ordersLists
    .flat()
    .filter((o) => o.status === 'Pendente' || o.status === 'Preparando');
  return { orders, tables };
}

export default async function OrdersPage() {
  const { orders, tables } = await getActiveOrders();
  return <OrdersClient orders={orders} tables={tables} />;
}
