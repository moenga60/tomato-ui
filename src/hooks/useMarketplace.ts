import { useMutation, useQuery } from 'react-query';
import { marketplace } from '../lib/api';

export const useProducts = (grade?: string) => {
  return useQuery(['products', grade], () => marketplace.getProducts(grade));
};

export const useCreateProduct = () => {
  return useMutation((data: any) => marketplace.createProduct(data));
};

export const useOrders = () => {
  return useQuery('orders', marketplace.getOrders);
};

export const useUpdateOrderStatus = () => {
  return useMutation(
    ({ orderId, status }: { orderId: number; status: string }) =>
      marketplace.updateOrderStatus(orderId, status)
  );
};