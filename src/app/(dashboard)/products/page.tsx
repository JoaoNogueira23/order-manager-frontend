import type { Product, ProductsResponse } from '@/lib/types';
import { handlesAPIProducts } from '@/lib/api_products';
import ProductsClient from '@/components/products/ProductsClient';

export const metadata = {
  title: 'Products - MesaFacil',
};

// Fetch products from the API
async function getProducts(page: number, limit: number): Promise<ProductsResponse> {
  const { getProducts: fetchProducts } = handlesAPIProducts();
  try {
    const data: ProductsResponse = await fetchProducts(page, limit);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: [], total: 0, page: '0', per_page: '0' };
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
  const params = await searchParams || {};
  const page = parseInt(params?.page || '0', 10);
  const limit = parseInt(params?.limit || '6', 10);

  const apiResponse = await getProducts(page, limit);
  const itemsPerPage = parseInt(apiResponse.per_page, 10) || limit;

  return (
    <ProductsClient products={apiResponse.data} itemsPerPage={itemsPerPage} />
  );
}
