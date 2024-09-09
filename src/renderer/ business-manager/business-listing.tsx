import { usePaginationState } from 'hooks/use-pagination-state';
import { useGetListBusiness } from 'main/queries/useBusiness';

export const BusinessListing = () => {
  const pagination = usePaginationState({
    initialPage: 1,
    initialPerPage: 15,
  });
  const { data: listBusiness } = useGetListBusiness({
    searchQuery: '',
    page: pagination.page,
    perPage: pagination.perPage,
  });
  console.log(listBusiness);
  return <></>;
};
