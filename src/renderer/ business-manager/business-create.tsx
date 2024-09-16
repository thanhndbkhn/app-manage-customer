import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  FormControl,
  Grid,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { AddItem } from 'assets';
import { convertDataToAutoComplete } from 'common/helper';
import StyledTextArea from 'common/StyledTextArea';
import StyledTextField, { TextFieldLabel } from 'common/StyledTextField';
import { useGetListCustomer } from 'main/queries/useCustomer';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AutoComplete from 'renderer/components/AutoComplete/AutoComplete';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';
import * as Yup from 'yup';
import { ProductListingAction } from './product-listing-action';

interface IBusinessCreate {
  onPrevStep: () => void;
}
export const BusinessCreate = ({ onPrevStep }: IBusinessCreate) => {
  const [clientSearch, setClientSearch] = useState('');
  const [listCustomerAutoComplete, setListCustomerAutoComplete] =
    useState<{ key: string; value: string }[]>();
  const [customerSelected, setCustomerSelected] = useState<any>();
  const [listProduct, setListProduct] = useState<any[]>([]);

  const { data: listCustomer } = useGetListCustomer({
    searchQuery: clientSearch,
    page: 1,
    perPage: 7,
  });

  useEffect(() => {
    if (listCustomer) {
      setListCustomerAutoComplete(
        convertDataToAutoComplete(listCustomer.items, false),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCustomer]);

  const [valueDefault, setValueDefault] = useState<string>('');
  const { control, handleSubmit, setValue, getValues, clearErrors, watch } =
    useForm<any>({
      mode: 'all',
      defaultValues: {
        taxCode: '',
      },
      resolver: yupResolver(
        Yup.object().shape({
          taxCode: Yup.string()
            .trim()
            .max(255, 'Max 255 characters')
            .required('Hãy chọn khách hàng'),
        }),
      ),
    });

  const handleSearch = (value: string) => {
    if (value.length >= 3) {
      setClientSearch(value);
    }
    if (!value) {
      setClientSearch('');
    }
  };

  const onSelect = (key: string, value?: string) => {
    setValue('taxCode', key);
    setValueDefault(value || '');
    clearErrors('taxCode');
    const customer = listCustomer?.items.find((item) => item.TAX_CODE === key);
    customer && setCustomerSelected(customer);
  };

  const addProduct = () => {
    setListProduct([...listProduct, {}]);
  };

  return (
    <>
      <Box
        style={{
          padding: '25px',
          background: 'rgb(225 225 225)',
          borderRadius: '15px',
        }}
      >
        {' '}
        <Box sx={{ pb: '12px', mb: '11px' }}>
          <Typography variant="h5">Tạo phương án kinh doanh</Typography>
        </Box>
        <Box
          sx={{
            p: '20px 24px 20px',
            borderRadius: '15px',
            backgroundColor: 'rgb(250, 253, 255)',
            display: 'flex',
            flexDirection: 'column',
            gap: '29px',
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <FormControl fullWidth>
              <TextFieldLabel sx={{ ml: '0px' }}>Tên khách hàng</TextFieldLabel>
              <Controller
                control={control}
                name={`taxCode`}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <div style={{ maxWidth: '400px' }}>
                      {listCustomerAutoComplete && (
                        <AutoComplete
                          {...field}
                          styleCustom={{ maxWidth: '400px' }}
                          listData={listCustomerAutoComplete}
                          handleSearch={handleSearch}
                          onSelect={onSelect}
                          valueDefault={valueDefault}
                          error={Boolean(error)}
                          helperText={error?.message}
                          placeHolder={'Select company'}
                        />
                      )}
                    </div>
                  </>
                )}
              />
            </FormControl>
            {customerSelected && (
              <>
                <FormControl fullWidth>
                  <TextFieldLabel sx={{ ml: '0px' }}>Mã số thuế</TextFieldLabel>
                  <StyledTextField
                    type="text"
                    autoComplete="off"
                    disabled={true}
                    value={customerSelected?.TAX_CODE}
                  />
                </FormControl>

                {customerSelected?.CITY && (
                  <FormControl fullWidth>
                    <TextFieldLabel sx={{ ml: '0px' }}>Địa chỉ</TextFieldLabel>
                    <StyledTextField
                      type="text"
                      autoComplete="off"
                      disabled={true}
                      value={customerSelected?.CITY}
                    />
                  </FormControl>
                )}

                <FormControl fullWidth>
                  <TextFieldLabel sx={{ ml: '0px' }}>Phân loại</TextFieldLabel>
                  {customerSelected?.CLASSIFY && (
                    <StyledTextField
                      type="text"
                      autoComplete="off"
                      disabled={true}
                      value={customerSelected?.CLASSIFY}
                    />
                  )}
                </FormControl>
              </>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            mt: 3,
            minHeight: '200px',
            p: '20px 24px 20px',
            borderRadius: '15px',
            backgroundColor: 'rgb(250, 253, 255)',
            display: 'flex',
            flexDirection: 'column',
            gap: '29px',
          }}
        >
          <Grid container columnSpacing={2.5} rowSpacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>Dự án</TextFieldLabel>
                <Controller
                  control={control}
                  name={`project`}
                  render={({ field, fieldState: { error } }) => (
                    <StyledTextField
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder="Tên khách hàng"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>
                  Điều khoản thanh toán
                </TextFieldLabel>
                <Controller
                  control={control}
                  name={`paymentTerms`}
                  render={({ field, fieldState: { error } }) => (
                    <StyledTextField
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder="Thanh toán"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>Trạng thái</TextFieldLabel>
                <Controller
                  control={control}
                  name={`status`}
                  render={({ field, fieldState: { error } }) => (
                    <StyledTextField
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder="trạng thái"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth></FormControl>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2.5} rowSpacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>
                  Chuyển giao công nghệ
                </TextFieldLabel>
                <Controller
                  control={control}
                  name={`technologyTransfer`}
                  render={({ field, fieldState: { error } }) => (
                    <StyledTextField
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder="Công nghệ"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>
                  Số lần bảo trì
                </TextFieldLabel>
                <Controller
                  control={control}
                  name={`numberMaintenanceTimes`}
                  render={({ field, fieldState: { error } }) => (
                    <StyledTextField
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder="Số lần bảo trì"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>
                  Thời gian bảo hành (tháng)
                </TextFieldLabel>
                <Controller
                  control={control}
                  name={`warrantyPeriod`}
                  render={({ field, fieldState: { error } }) => (
                    <StyledTextField
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder="Thời gian bảo hành"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>Ghi chú</TextFieldLabel>
                <Controller
                  control={control}
                  name={`note`}
                  render={({ field, fieldState: { error } }) => (
                    <Box
                      style={{
                        width: '100%',
                      }}
                    >
                      <StyledTextArea
                        {...field}
                        type="text"
                        autoComplete="off"
                        placeholder="Ghi chú"
                        error={Boolean(error)}
                        helperText={error?.message}
                        multiline
                        sx={{
                          '.MuiOutlinedInput-root': {
                            height: '90px !important',
                          },
                          textarea: {
                            overflow: 'auto !important',
                          },
                        }}
                        onInput={(e: any) => {
                          e.target.value =
                            e.target.value.length > 1000
                              ? e.target.value.slice(0, 1000)
                              : e.target.value;
                        }}
                      />
                    </Box>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <ProductListingAction
          setListProduct={setListProduct}
          listProduct={listProduct}
          addProduct={addProduct}
        />
      </Box>
    </>
  );
};
