import { BatCard } from './BatCard';
import { useGetBats } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ProductCatalog() {
  const { data: bats = [], isLoading, error } = useGetBats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load products. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  if (bats.length === 0) {
    return (
      <Alert>
        <AlertTitle>No Products Available</AlertTitle>
        <AlertDescription>Check back soon for our handcrafted Uttarakhandi willow bats.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bats.map((bat) => (
        <BatCard key={Number(bat.id)} bat={bat} />
      ))}
    </div>
  );
}
