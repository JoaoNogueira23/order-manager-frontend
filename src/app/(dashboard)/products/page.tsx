import type { Product } from '@/lib/types';
import { handlesAPIProducts } from '@/lib/api_products';
import ProductsClient from '@/components/products/ProductsClient';

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

export default async function ProductsPage() {
  const allProducts = await getProducts();
  const itemsPerPage = 6;

  return <ProductsClient products={allProducts} itemsPerPage={itemsPerPage} />;
}
