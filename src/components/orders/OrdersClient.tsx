'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { OrderSummaryCard } from './OrderSummaryCard';
import type { Order, Table, CreateOrder } from '@/lib/types';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getHandlesAPI } from '@/lib/api';

interface OrdersClientProps {
  orders: Order[];
  tables: Table[];
}

const formSchema = z.object({
  id_table: z.string().min(1),
  quantity: z.number().min(1),
});

export default function OrdersClient({ orders, tables }: OrdersClientProps) {
  const { createOrder } = getHandlesAPI();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_table: tables[0]?.id_table ?? '',
      quantity: 1,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload: CreateOrder = {
      id_table: data.id_table,
      quantity: data.quantity,
    };
    await createOrder(payload);
    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <PageHeader
        title="Active Orders"
        description="List of orders currently in progress."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> New Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="id_table"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Table</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select table" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tables.map((table) => (
                              <SelectItem key={table.id_table} value={table.id_table}>
                                {`Mesa ${table.table_number} - ${table.location}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Create Order</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        }
      />

      {orders.length === 0 ? (
        <p className="text-muted-foreground">No active orders.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderSummaryCard key={order.id_order} order={order} />
          ))}
        </div>
      )}
    </>
  );
}
