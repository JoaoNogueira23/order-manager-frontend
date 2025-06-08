"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { handlesAPIProducts } from '@/lib/api_products';
import type { Product } from '@/lib/types';
import { redirect } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProductListClient } from './ProductListClient';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price is required'),
  volume: z.number().min(0, 'Volume is required'),
  describe: z.string().min(1, 'Description is required'),
  url_image: z.string().url('Image URL must be valid'),
  category: z.enum(['Bebidas', 'Sobremesa', 'Aperitivos']),
});

interface ProductsClientProps {
  products: Product[];
  itemsPerPage: number;
}

export default function ProductsClient({ products, itemsPerPage }: ProductsClientProps) {
  const { createProduct } = handlesAPIProducts();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      volume: 0,
      describe: '',
      url_image: '',
      category: 'Bebidas',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const product: Product = {
      id_product: '',
      isactive: true,
      Ispromotion: false,
      ...data,
    };

    const response: any = await createProduct(product);
    if (response && response.status === 201) {
      setOpen(false);
      redirect('/products');
    }
  };

  return (
    <>
      <PageHeader
        title="Product Catalog"
        description="Browse all available products and manage your menu."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Coca Cola" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume (ml)</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Bebidas">Bebidas</SelectItem>
                            <SelectItem value="Aperitivos">Aperitivos</SelectItem>
                            <SelectItem value="Sobremesa">Sobremesa</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="describe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe the product" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Create Product</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        }
      />
      <ProductListClient initialProducts={products} itemsPerPage={itemsPerPage} />
    </>
  );
}
