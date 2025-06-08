import type { Product } from '@/lib/types';
import { handlesAPIProducts } from '@/lib/api_products';
import ProductsClient from '@/components/products/ProductsClient';

export const metadata = {
  title: 'Products - MesaFacil',
};

// Fetch products from the API
async function getProducts(page: number, limit: number): Promise<Product[]> {
  const { getProducts: fetchProducts } = handlesAPIProducts();
  try {
    const data: Product[] = await fetchProducts(page, limit);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

interface ProductsPageProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const page = parseInt(searchParams?.page || '1', 10);
  const limit = parseInt(searchParams?.limit || '6', 10);

  const allProducts = await getProducts(page, limit);

  return (
    <ProductsClient products={allProducts} itemsPerPage={limit} />
  );
}
