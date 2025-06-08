import { PageHeader } from '@/components/layout/PageHeader';
import type { Product } from '@/lib/types';
import { ProductListClient } from '@/components/products/ProductListClient';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { handlesAPIProducts } from '@/lib/api_products';

export const metadata = {
  title: 'Products - MesaFacil',
};

// Fetch products from the API
async function getProducts(): Promise<Product[]> {
  const { getProducts: fetchProducts } = handlesAPIProducts();
  try {
    const data: Product[] = await fetchProducts();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
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
