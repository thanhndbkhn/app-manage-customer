/** @format */

import {
  convertDataToAutoComplete,
  convertDataToAutoCompleteProduct,
} from 'common/helper';
import { usePaginationState } from 'hooks/use-pagination-state';
import { useGetListProduct } from 'main/queries/useProduct';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import AutoComplete from 'renderer/components/AutoComplete/AutoComplete';

interface IProductEdit {
  valueDefault: string;
  keyData: string;
  onChange: (index: number, product: any) => void;
  index: number;
  control: any;
}

export const ProductEdit = ({
  valueDefault,
  keyData,
  onChange,
  index,
  control,
}: IProductEdit) => {
  const [listMaterialAutoComplete, setListMaterialAutoComplete] =
    useState<{ key: string; value: string }[]>();

  const [clientSearch, setClientSearch] = useState('');
  const pagination = usePaginationState({
    initialPage: 1,
    initialPerPage: 15,
  });
  const { data: listProduct } = useGetListProduct({
    searchQuery: clientSearch,
    page: pagination.page,
    perPage: pagination.perPage,
  });

  useEffect(() => {
    if (listProduct?.items && listProduct?.items.length > 0) {
      setListMaterialAutoComplete(
        convertDataToAutoCompleteProduct(listProduct?.items, false),
      );
    } else {
      setListMaterialAutoComplete([]);
    }
  }, [listProduct]);

  const handleSearch = (value: string) => {
    if (value.length >= 3) {
      setClientSearch(value);
    }
    if (!value) {
      setClientSearch('');
    }
  };

  const onSelect = (key: string, value?: string) => {
    const item = listProduct?.items.find(
      (product) => product.PRODUCT_ID === key,
    );
    onChange(index, item);
  };

  return (
    <>
      <div style={{ width: '263px' }}>
        <Controller
          control={control}
          name={`products.${index}.productId`}
          render={({ field, fieldState: { error } }) => (
            <>
              {listMaterialAutoComplete && (
                <AutoComplete
                  {...field}
                  styleCustom={{ maxWidth: '263px' }}
                  listData={listMaterialAutoComplete}
                  handleSearch={handleSearch}
                  onSelect={onSelect}
                  valueDefault={valueDefault}
                  topCard={`${-index * 60 - 100}px`}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            </>
          )}
        />
      </div>
    </>
  );
};
