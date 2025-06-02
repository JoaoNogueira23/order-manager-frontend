import { getHandlesAPI } from '@/lib/api';
import TablesClient from '@/components/tables/tablesClient';

export const metadata = {
  title: 'Tables - MesaFacil',
};


export default async function TablesPage() {
  const { getTables } = getHandlesAPI();
  const tables = await getTables();

  return (
    <TablesClient tables={tables} />
  );
}
