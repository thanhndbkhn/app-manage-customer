import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { ITabProduct } from './contants';
import { ProductListing } from './product-listing';
import { ProductCreate } from './product-create';
// import { useGetListCustomer } from 'main/queries/useCustomer';
// import { getListCustomer } from 'main/services/customer.service';

export const ProductManager = () => {
  const [value, setValue] = React.useState(ITabProduct.List);

  const handleChange = (event: React.SyntheticEvent, newValue: ITabProduct) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value={ITabProduct.List} label="Danh sách sản phẩm" />
        <Tab value={ITabProduct.Create} label="Tạo sản phẩm" />
      </Tabs>
      {value === ITabProduct.List && <ProductListing />}
      {value === ITabProduct.Create && <ProductCreate />}
    </Box>
  );
};
