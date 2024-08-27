import { useQuery } from '@tanstack/react-query';
import { getListCurrencyBuy } from 'main/services/currency.service';

export function useGetListCurrencyBuy() {
  return useQuery({
    queryKey: ['list-currency-buy'],
    queryFn: async () => {
      try {
        const data = await getListCurrencyBuy();
        return data;
      } catch (error) {
        throw Error();
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
