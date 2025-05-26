import { PageHeader } from '@/components/layout/PageHeader';
import { mockProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductListClient } from '@/components/products/ProductListClient';
import { Button } from '@/components/ui/button';
import { CatIcon, PlusCircle } from 'lucide-react';
import { handlesAPIProducts } from '@/lib/api_products';

export const metadata = {
  title: 'Products - MesaFacil',
};

// Simulate fetching data
async function getProducts(): Promise<Product[]> {
  const {getProducts} = handlesAPIProducts()
  return new Promise(async (resolve, reject) => {
    try{
      const data: Product[] = await getProducts();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }

  })

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
