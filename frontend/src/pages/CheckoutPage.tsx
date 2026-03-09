import { useNavigate } from '@tanstack/react-router';
import { useViewCart } from '../hooks/useQueries';
import { CheckoutForm } from '../components/CheckoutForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '../utils/formatPrice';
import { ArrowLeft } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cart = [] } = useViewCart();

  const total = cart.reduce((sum, item) => sum + Number(item.bat.price) * Number(item.quantity), 0);

  if (cart.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate({ to: '/cart' })} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.bat.name} × {Number(item.quantity)}
                      </span>
                      <span>{formatPrice(Number(item.bat.price) * Number(item.quantity))}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
