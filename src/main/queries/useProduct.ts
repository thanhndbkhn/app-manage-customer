import { useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, getListProduct } from 'main/services/product.service';

export function useGetListProduct(params: any) {
  return useQuery({
    queryKey: ['list-product', params],
    queryFn: async () => {
      try {
        const data = await getListProduct(params);
        return data;
      } catch (error) {
        throw Error();
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (body: any) => {
      try {
        return createProduct(body);
      } catch (error) {
        console.log(error);
        throw Error();
      }
    },
  });
}
