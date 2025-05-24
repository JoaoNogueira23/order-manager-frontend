import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { CircleDollarSign, PlusCircle, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const IconComponent = product.categoryIcon;
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          data-ai-hint={product.dataAiHint || 'food item'}
        />
        <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm">
          {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
          {product.category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold truncate" title={product.name}>{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground h-10 overflow-hidden text-ellipsis">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow mt-1">
        <div className="flex items-center text-lg font-bold text-primary">
          <CircleDollarSign className="mr-2 h-5 w-5" /> ${product.price.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10">
          <PlusCircle className="mr-2 h-4 w-4" /> Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
}
