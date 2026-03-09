import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle className="h-20 w-20 mx-auto mb-6 text-primary" />
            <h1 className="text-3xl font-bold mb-3">Order Placed Successfully!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your order. We will contact you shortly to confirm delivery details.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Your handcrafted Uttarakhandi willow bat will be prepared with care and delivered to your address.
              </p>
              <Button onClick={() => navigate({ to: '/' })} size="lg" className="mt-6">
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
