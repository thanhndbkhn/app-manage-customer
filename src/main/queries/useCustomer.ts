import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createCustomer,
  getListCustomer,
} from 'main/services/customer.service';

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

export function useCreateCustomer() {
  return useMutation({
    mutationFn: async (body: any) => {
      try {
        return createCustomer(body);
      } catch (error) {
        console.log(error);
        throw Error();
      }
    },
  });
}
