import React from 'react';
import { EBusinessTab } from './constants';
import { BusinessListing } from './business-listing';
import { Box, Tabs, Tab } from '@mui/material';
import { ITabCustomer } from 'renderer/customer-manager/constants';
import { CustomerCreate } from 'renderer/customer-manager/customer-create';
import { CustomerListing } from 'renderer/customer-manager/customer-listing';
import { BusinessCreate } from './business-create';

export const BusinessManager = () => {
  const [value, setValue] = React.useState(EBusinessTab.Listing);
  const [openModalDetails, setOpenModalDetails] = React.useState(false);
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: EBusinessTab,
  ) => {
    setValue(newValue);
  };
  return (
    <>
      {' '}
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value={EBusinessTab.Listing} label="Danh sách PAKD" />
          <Tab value={EBusinessTab.Create} label="Tạo PAKD" />
        </Tabs>
        {value === EBusinessTab.Listing && <BusinessListing />}
        {value === EBusinessTab.Create && (
          <BusinessCreate onPrevStep={() => setValue(EBusinessTab.Listing)} />
        )}
      </Box>
    </>
  );
};
