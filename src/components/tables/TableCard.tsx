'use client'

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Table } from '@/lib/types';
import { Armchair, CheckCircle, Clock, MapPin, Users, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getHandlesAPI } from '@/lib/api';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface TableCardProps {
  table: Table;
}

const statusColors = {
  Available: 'bg-green-500 hover:bg-green-600',
  Occupied: 'bg-red-500 hover:bg-red-600',
  Reserved: 'bg-yellow-500 hover:bg-yellow-600 text-black',
};

const statusIcons = {
  Available: <CheckCircle className="h-4 w-4 text-green-200" />,
  Occupied: <XCircle className="h-4 w-4 text-red-200" />,
  Reserved: <Clock className="h-4 w-4 text-yellow-200" />,
}


export function TableCard({ table }: TableCardProps) {
  const { createSection } = getHandlesAPI();
  const [loading, setLoading] = useState(false);

  const handleOpenSection = async () => {
    setLoading(true);
    const resp = await createSection(table.id_table);
    if (resp.status >= 200 && resp.status < 300) {
      toast({
        title: "Seção aberta",
        description: `Mesa ${table.table_number} em uso`,
      });
      window.location.reload();
    } else {
      toast({
        title: "Erro ao abrir",
        description: "Não foi possível abrir a seção",
      });
    }
    setLoading(false);
  };

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-semibold">Table {table.table_number}</CardTitle>
          <Badge 
            className={cn(
              "text-xs px-2 py-1",
              table.status === 'Livre' && 'border-green-500 text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/50 dark:border-green-700',
              table.status === 'Ocupada' && 'border-red-500 text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/50 dark:border-red-700',
              table.status === 'Reservada' && 'border-yellow-500 text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50 dark:border-yellow-700'
            )} 
            variant="outline"
          >
             {table.status === 'Livre' && <CheckCircle className="mr-1 h-3 w-3" />}
             {table.status === 'Ocupada' && <XCircle className="mr-1 h-3 w-3" />}
             {table.status === 'Reservada' && <Clock className="mr-1 h-3 w-3" />}
            {table.status}
          </Badge>
          <div className="flex items-center">
              {table.status === 'Livre' && 
              <Button
              variant="ghost"
              className="py-0 items-start border-green-500 bg-green-100 text-green-700"
              onClick={handleOpenSection}
              disabled={loading}
              >
                {loading ? 'Abrindo...' : 'Abrir Seção'}
              </Button>
              }
          </div>
        </div>
        <CardDescription className="flex items-center text-sm text-muted-foreground pt-1">
          <MapPin className="mr-2 h-4 w-4" /> {table.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-foreground/80">
          <Users className="mr-2 h-4 w-4" /> Capacity: {table.capacity} guests
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/tables/${table.id_table}`} passHref className="w-full">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            View Details & Orders
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
