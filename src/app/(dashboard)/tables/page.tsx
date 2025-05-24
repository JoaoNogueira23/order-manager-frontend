import { PageHeader } from '@/components/layout/PageHeader';
import { TableCard } from '@/components/tables/TableCard';
import { Button } from '@/components/ui/button';
import { getHandlesAPI } from '@/lib/api';
import { PlusCircle } from 'lucide-react';

export const metadata = {
  title: 'Tables - MesaFacil',
};


export default async function TablesPage() {
  const {getTables} = getHandlesAPI()

  const tables = await getTables();

  return (
    <>
      <PageHeader 
        title="Restaurant Tables" 
        description="Oversee and manage all dining tables."
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Table
          </Button>
        }
      />
      {tables.length === 0 ? (
        <p className="text-muted-foreground">No tables found. Add a new table to get started.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
      )}
    </>
  );
}
