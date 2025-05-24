import { PageHeader } from '@/components/layout/PageHeader';
import { mockProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductListClient } from '@/components/products/ProductListClient';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const metadata = {
  title: 'Products - MesaFacil',
};

// Simulate fetching data
async function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 200); // Simulate network delay
  });
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const allProducts = await getProducts();
  const itemsPerPage = 6;

  return (
    <>
      <PageHeader 
        title="Product Catalog" 
        description="Browse all available products and manage your menu."
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        }
      />
      <ProductListClient initialProducts={allProducts} itemsPerPage={itemsPerPage} />
    </>
  );
}
