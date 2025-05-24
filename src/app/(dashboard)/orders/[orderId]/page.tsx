import { PageHeader } from '@/components/layout/PageHeader';
import { getOrderById, getTableById } from '@/lib/data';
import type { Order } from '@/lib/types';
import { OrderItemCard } from '@/components/orders/OrderItemCard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CalendarDays, CheckCircle, CircleDollarSign, Clock, ListOrdered, Loader2, Printer, ShoppingBag, Tablets } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Order Details - MesaFacil',
};

interface OrderDetailsPageProps {
  params: { orderId: string };
}

async function getOrderData(orderId: string): Promise<Order | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getOrderById(orderId));
    }, 200);
  });
}

const statusConfig = {
  Pending: { icon: <Clock className="h-4 w-4" />, color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/50', borderColor: 'border-yellow-500 dark:border-yellow-600' },
  Preparing: { icon: <Loader2 className="h-4 w-4 animate-spin" />, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/50', borderColor: 'border-blue-500 dark:border-blue-600' },
  Ready: { icon: <CheckCircle className="h-4 w-4" />, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/50', borderColor: 'border-purple-500 dark:border-purple-600' },
  Served: { icon: <CheckCircle className="h-4 w-4" />, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/50', borderColor: 'border-green-500 dark:border-green-600' },
  Paid: { icon: <CircleDollarSign className="h-4 w-4" />, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-900/50', borderColor: 'border-gray-500 dark:border-gray-600' },
  Cancelled: { icon: <AlertTriangle className="h-4 w-4" />, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/50', borderColor: 'border-red-500 dark:border-red-600' },
};

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const order = await getOrderData(params.orderId);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Order Not Found</h2>
        <p className="text-muted-foreground mb-6">The order you are looking for does not exist or could not be loaded.</p>
        <Link href="/tables">
          <Button variant="outline">Back to Tables</Button>
        </Link>
      </div>
    );
  }
  
  const table = getTableById(order.tableId);
  const currentStatusConfig = statusConfig[order.status];

  return (
    <>
      <PageHeader 
        title={`Order #${order.id.substring(0, 6)}`}
        description={`Details for order placed on ${format(new Date(order.orderTime), "PPPp")}.`}
        actions={
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print Receipt
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl">Items in this Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item, index) => (
                <OrderItemCard key={item.id} item={item} index={index} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center"><Tablets className="mr-2 h-4 w-4"/>Table:</span>
                <Link href={`/tables/${order.tableId}`} className="font-medium text-primary hover:underline">
                  {table ? `Table ${table.number} (${table.location})` : order.tableId}
                </Link>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center"><CalendarDays className="mr-2 h-4 w-4"/>Order Time:</span>
                <span className="font-medium">{format(new Date(order.orderTime), "PPp")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center"><ShoppingBag className="mr-2 h-4 w-4"/>Status:</span>
                <Badge variant="outline" className={cn("text-xs px-2 py-1 flex items-center gap-1", currentStatusConfig.bgColor, currentStatusConfig.color, currentStatusConfig.borderColor)}>
                  {currentStatusConfig.icon}
                  {order.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center"><ListOrdered className="mr-2 h-4 w-4"/>Total Items:</span>
                <span className="font-medium">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-foreground flex items-center"><CircleDollarSign className="mr-2 h-5 w-5"/>Total Amount:</span>
                <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              {order.status !== 'Paid' && order.status !== 'Cancelled' && (
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <CircleDollarSign className="mr-2 h-4 w-4" /> Mark as Paid
                </Button>
              )}
              {order.status === 'Paid' && (
                 <p className="text-sm text-green-600 w-full text-center font-medium flex items-center justify-center"><CheckCircle className="mr-2 h-4 w-4"/>This order has been paid.</p>
              )}
               {order.status === 'Cancelled' && (
                 <p className="text-sm text-red-600 w-full text-center font-medium flex items-center justify-center"><AlertTriangle className="mr-2 h-4 w-4"/>This order was cancelled.</p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
