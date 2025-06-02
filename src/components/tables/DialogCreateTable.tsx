"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form'
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

// schema de validação
const formSchema = z.object({
  tableName: z.string().min(1, 'Table name is required'),
})

export function DialogCreateTable() {
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        tableName: '',
        },
    })

    const onSubmit = (data: any) => {
        console.log('Form data:', data)
    }
    
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Table
            </Button>
        </DialogTrigger>
        <DialogContent>
            {/* Formulário para adicionar nova mesa usando o Form do ui/form.tsx e o model de Table */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="tableName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Table Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Ex: Table 1" {...field} />
                        </FormControl>
                        <FormDescription>This is the name of the table.</FormDescription>
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