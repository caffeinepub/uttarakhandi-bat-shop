import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Bat, CartItem } from '../backend';

export function useGetBats() {
  const { actor, isFetching } = useActor();

  return useQuery<Bat[]>({
    queryKey: ['bats'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useViewCart() {
  const { actor, isFetching } = useActor();

  return useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.viewCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ batId, quantity }: { batId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addToCart(batId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useCheckout() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ customerName, address, phone }: { customerName: string; address: string; phone: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.checkout(customerName, address, phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
