import { useQuery } from '@tanstack/react-query';
import { getListProduct } from 'main/services/product.service';

export function useGetListProduct() {
  return useQuery({
    queryKey: ['list-product'],
    queryFn: async () => {
      try {
        const data = await getListProduct();
        return data;
      } catch (error) {
        throw Error();
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
