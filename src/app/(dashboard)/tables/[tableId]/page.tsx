import { PageHeader } from '@/components/layout/PageHeader';
import type { Order, Table } from '@/lib/types';
import { OrderSummaryCard } from '@/components/orders/OrderSummaryCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Armchair, MapPin, PlusCircle, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {getHandlesAPI} from "@/lib/api";

export const metadata = {
  title: 'Table Details - MesaFacil',
};

interface TableDetailsPageProps {
  params: { tableId: string };
}

// Simulate fetching data
async function getTableData(tableId: string): Promise<{ table: Table | undefined; orders: Order[] }> {
  const {getOrders, getTableById} = getHandlesAPI()
  
  return new Promise(async (resolve, reject) => {
  try {
    const table: Table = await getTableById(tableId);
    const orders = table ? await getOrders(tableId) : [];
    resolve({ table, orders });
  } catch (error) {
    console.log(error);
  }
});
}

export default async function TableDetailsPage({ params }: TableDetailsPageProps) {
  const {tableId} = await params;
  const { table, orders } = await getTableData(tableId ? tableId : '');

  if (!table) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Table Not Found</h2>
        <p className="text-muted-foreground mb-6">The table you are looking for does not exist or could not be loaded.</p>
        <Link href="/tables">
          <Button variant="outline">Back to Tables List</Button>
        </Link>
      </div>
    );
  }

  const statusColors = {
    Livre: 'text-green-600 bg-green-100 border-green-500',
    Ocupada: 'text-red-600 bg-red-100 border-red-500',
    Reservada: 'text-yellow-600 bg-yellow-100 border-yellow-500',
  };

  return (
    <>
      <PageHeader 
        title={`Table ${table.table_number} - ${table.location}`}
        description={`Details and current orders for Table ${table.table_number}.`}
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Order
          </Button>
        }
      />

      <Card className="mb-8 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Table Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/90">
          <div className="flex items-center">
            <Armchair className="mr-3 h-5 w-5 text-primary" />
            <span><strong>Number:</strong> {table.table_number}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-3 h-5 w-5 text-primary" />
            <span><strong>Location:</strong> {table.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-3 h-5 w-5 text-primary" />
            <span><strong>Capacity:</strong> {table.capacity} guests</span>
          </div>
          <div className="flex items-center">
            <Badge variant="outline" className={cn("text-sm px-3 py-1", statusColors[table.status? table.status : 'Livre'])}>
              <strong>Status:</strong> {table.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Current Orders</h2>
        {orders.length === 0 ? (
          <p className="text-muted-foreground">No current orders for this table.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderSummaryCard key={order.id_order} order={order} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
