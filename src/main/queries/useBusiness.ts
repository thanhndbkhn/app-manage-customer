import { useMutation, useQuery } from '@tanstack/react-query';
import { getListBusiness } from 'main/services/business.service';

export function useGetListBusiness(params: any) {
  return useQuery({
    queryKey: ['list-business', params],
    queryFn: async () => {
      try {
        const data = await getListBusiness(params);
        return data;
      } catch (error) {
        throw Error();
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
