import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { OrderItem } from '@/lib/types';
import { Package, CircleDollarSign, Hash } from 'lucide-react';

interface OrderItemCardProps {
  item: OrderItem;
  index: number;
}

export function OrderItemCard({ item, index }: OrderItemCardProps) {
  return (
    <Card className="flex flex-col sm:flex-row items-center p-4 gap-4 shadow-md rounded-lg">
      <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-md overflow-hidden shrink-0">
        <Image
          src={item.productImageUrl}
          alt={item.productName}
          fill
          sizes="100px"
          className="object-cover"
          data-ai-hint="food item product"
        />
      </div>
      <div className="flex-grow text-center sm:text-left">
        <CardTitle className="text-lg font-semibold mb-1">{item.productName}</CardTitle>
        <div className="text-sm text-muted-foreground space-y-1">
          <p className="flex items-center justify-center sm:justify-start">
            <Package className="mr-2 h-4 w-4" /> Quantity: {item.quantity}
          </p>
          <p className="flex items-center justify-center sm:justify-start">
            <CircleDollarSign className="mr-2 h-4 w-4" /> Unit Price: ${item.unitPrice.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="text-lg font-semibold text-primary shrink-0 sm:ml-auto pt-2 sm:pt-0">
        ${item.totalPrice.toFixed(2)}
      </div>
    </Card>
  );
}
