import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { ITabCustomer } from './constants';
import { CustomerListing } from './customer-listing';
import { CustomerCreate } from './customer-create';

export const CustomerManager = () => {
  const [value, setValue] = React.useState(ITabCustomer.List);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ITabCustomer,
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value={ITabCustomer.List} label="Danh sách khách hàng" />
        <Tab value={ITabCustomer.Create} label="Tạo khách hàng" />
      </Tabs>
      {value === ITabCustomer.List && <CustomerListing />}
      {value === ITabCustomer.Create && (
        <CustomerCreate onPrevStep={() => setValue(ITabCustomer.List)} />
      )}
    </Box>
  );
};
