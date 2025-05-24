"use client";

import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { PaginationControls } from './PaginationControls';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface ProductListClientProps {
  initialProducts: Product[];
  itemsPerPage?: number;
}

const CATEGORIES = ["All", "Drinks", "Main Courses", "Desserts", "Appetizers"];

export function ProductListClient({ initialProducts, itemsPerPage = 6 }: ProductListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);


  const filteredProducts = initialProducts.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);
  
  // Effect for handling page changes from URL (e.g. browser back/forward)
  useEffect(() => {
    if (mounted) { // Only run on client after mount
        const params = new URLSearchParams(window.location.search);
        const pageFromUrl = parseInt(params.get('page') || '1', 10);
        if (pageFromUrl !== currentPage && pageFromUrl > 0 && pageFromUrl <= totalPages) {
            setCurrentPage(pageFromUrl);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, totalPages]); // Removed currentPage to avoid loop with PaginationControls


  if (!mounted) {
    // Render a loading state or null during SSR/pre-hydration for searchParams dependent state
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow"></div>
                <div></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(itemsPerPage)].map((_, i) => (
                    <div key={i} className="bg-card p-4 rounded-lg shadow-md animate-pulse h-[350px]">
                        <div className="w-full h-48 bg-muted rounded-md mb-4"></div>
                        <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-full mb-1"></div>
                        <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
                        <div className="h-8 bg-muted rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg shadow">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2">
           <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
         <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No products match your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={currentPage < totalPages}
          hasPrevPage={currentPage > 1}
        />
      )}
    </div>
  );
}
