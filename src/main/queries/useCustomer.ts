import { useQuery } from '@tanstack/react-query';
import { getListCustomer } from 'main/services/customer.service';

export function useGetListCustomer() {
  return useQuery({
    queryKey: ['list-customer'],
    queryFn: async () => {
      try {
        const data = await getListCustomer();
        return data;
      } catch (error) {
        throw Error();
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}

