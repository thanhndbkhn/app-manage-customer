/** @format */

import {
  convertDataToAutoComplete,
  convertDataToAutoCompleteProduct,
} from 'common/helper';
import { usePaginationState } from 'hooks/use-pagination-state';
import { useGetListProduct } from 'main/queries/useProduct';
import { useEffect, useState } from 'react';
import AutoComplete from 'renderer/components/AutoComplete/AutoComplete';

interface IProductEdit {
  valueDefault: string;
  keyData: string;
  onChange: (id: string, key: string) => void;
}

export const ProductEdit = ({
  valueDefault,
  keyData,
  onChange,
}: IProductEdit) => {
  const [listMaterialAutoComplete, setListMaterialAutoComplete] =
    useState<{ key: string; value: string }[]>();

  const [clientSearch, setClientSearch] = useState('');
  const pagination = usePaginationState({
    initialPage: 1,
    initialPerPage: 15,
  });
  const { data: listProduct } = useGetListProduct({
    searchQuery: '',
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
    onChange(key || '', keyData);
    // setValueDefault(value || "");
    // setValue("templateId", key);
  };

  return (
    <>
      <div style={{ width: '263px' }}>
        {listMaterialAutoComplete && (
          <AutoComplete
            styleCustom={{ maxWidth: '263px' }}
            listData={listMaterialAutoComplete}
            handleSearch={handleSearch}
            onSelect={onSelect}
            valueDefault={valueDefault}
          />
        )}
      </div>
    </>
  );
};
