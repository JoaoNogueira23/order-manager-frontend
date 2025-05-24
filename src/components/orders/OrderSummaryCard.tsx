import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Order } from '@/lib/types';
import { Clock, ListOrdered, Tag, CheckCircle, Loader2, AlertTriangle, CircleDollarSign, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface OrderSummaryCardProps {
  order: Order;
}

const statusConfig = {
  Pending: { icon: <Clock className="h-4 w-4" />, color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/50', borderColor: 'border-yellow-500 dark:border-yellow-600' },
  Preparing: { icon: <Loader2 className="h-4 w-4 animate-spin" />, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/50', borderColor: 'border-blue-500 dark:border-blue-600' },
  Ready: { icon: <CheckCircle className="h-4 w-4" />, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/50', borderColor: 'border-purple-500 dark:border-purple-600' },
  Served: { icon: <CheckCircle className="h-4 w-4" />, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/50', borderColor: 'border-green-500 dark:border-green-600' },
  Paid: { icon: <CircleDollarSign className="h-4 w-4" />, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-900/50', borderColor: 'border-gray-500 dark:border-gray-600' },
  Cancelled: { icon: <AlertTriangle className="h-4 w-4" />, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/50', borderColor: 'border-red-500 dark:border-red-600' },
};


export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  const currentStatusConfig = statusConfig[order.status];

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">Order #{order.id.substring(0, 6)}</CardTitle>
          <Badge variant="outline" className={cn("text-xs px-2 py-1 flex items-center gap-1", currentStatusConfig.bgColor, currentStatusConfig.color, currentStatusConfig.borderColor)}>
            {currentStatusConfig.icon}
            {order.status}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground flex items-center pt-1">
           <Clock className="mr-2 h-4 w-4" /> {format(new Date(order.orderTime), "PPpp")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <ListOrdered className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{order.items.length} item{order.items.length === 1 ? '' : 's'}</span>
        </div>
        <div className="flex items-center text-sm font-medium">
          <CircleDollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>Total: ${order.totalAmount.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/orders/${order.id}`} passHref className="w-full">
          <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10">
            View Order Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
