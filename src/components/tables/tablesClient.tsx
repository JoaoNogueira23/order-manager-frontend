'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { TableCard } from '@/components/tables/TableCard';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { getHandlesAPI } from '@/lib/api';
import { Table } from '@/lib/types';
import { redirect } from 'next/navigation';

// schema de validação
const formSchema = z.object({
    table_number: z.number().min(1, 'Table number is required'),
    location: z.string().min(1, 'Location is required'),
    capacity: z.number().min(1, 'Capacity must be at least 1'),
})

export default function TablesClient({ tables }: { tables: any[] }) {
    const {createTable} = getHandlesAPI()

    const form = useForm({
            resolver: zodResolver(formSchema),
        })
  
    const onSubmit = async (data: any) => {
        const table: Table = data
        const response = await createTable(table)
        console.log('Response:', response)
        if (response.status == 201) {
            redirect("/tables")
        }
    }

    return (
        <>
        <PageHeader
            title="Restaurant Tables"
            description="Oversee and manage all dining tables."
            actions={
            <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New Table
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        {/* Formulário para adicionar nova mesa usando o Form do ui/form.tsx e o model de Table */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                control={form.control}
                                name="table_number"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Número da Mesa</FormLabel>
                                    <FormControl>
                                        <Input 
                                        placeholder="Ex: 1" 
                                        type='number' 
                                        {...field}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value, 10);
                                            field.onChange(isNaN(value) ? '' : value);
                                        }} />
                                    </FormControl>
                                    <FormDescription>Preencha o número da mesa.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Localização</FormLabel>
                                    <FormControl>
                                        <Input 
                                        placeholder="Ex: Salão" 
                                        type='text' 
                                        {...field} 
                                        />
                                    </FormControl>
                                    <FormDescription>Preencha a localização da mesa.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Capacidade</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: 4" 
                                        type="number" 
                                        {...field} 
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value, 10);
                                            field.onChange(isNaN(value) ? '' : value);
                                        }}
                                        />
                                    </FormControl>
                                    <FormDescription>Preencha a capacidade da mesa.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
            
                                <Button type="submit">Create Table</Button>
                            </form>
                        </Form>
                    </DialogContent>
            </Dialog>
            }
        />
        {tables.length === 0 ? (
            <p className="text-muted-foreground">No tables found. Add a new table to get started.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tables.map((table) => (
                <TableCard key={table.id_table} table={table} />
            ))}
            </div>
        )}
        </>
    );
}
