import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check } from 'lucide-react';
import { useAddToCart } from '../hooks/useQueries';
import { formatPrice } from '../utils/formatPrice';
import type { Bat } from '../backend';

interface BatCardProps {
  bat: Bat;
}

export function BatCard({ bat }: BatCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useAddToCart();

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({ batId: bat.id, quantity: BigInt(1) });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <Card className="product-card overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden bg-secondary/20">
          <img
            src={`/assets/generated/${bat.image}`}
            alt={bat.name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{bat.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{bat.description}</p>
        <Badge variant="secondary" className="text-lg font-bold">
          {formatPrice(bat.price)}
        </Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={addToCart.isPending || isAdded}
          className="w-full"
          size="lg"
        >
          {isAdded ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
