import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createBusiness,
  createBusinessDetails,
  getListBusiness,
} from 'main/services/business.service';

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

export function useCreateBusiness() {
  return useMutation({
    mutationFn: async (body: any) => {
      try {
        return createBusiness(body);
      } catch (error) {
        console.log(error);
        throw Error();
      }
    },
  });
}

export function useCreateBusinessDetails() {
  return useMutation({
    mutationFn: async (body: any) => {
      try {
        return createBusinessDetails(body);
      } catch (error) {
        console.log(error);
        throw Error();
      }
    },
  });
}
