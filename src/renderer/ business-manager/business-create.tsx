import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  Grid,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
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
const regexDecimal = /^\d+(?:[\.,]\d+)?$/;

interface IBusinessCreate {
  onPrevStep: () => void;
}
export const BusinessCreate = ({ onPrevStep }: IBusinessCreate) => {
  const [clientSearch, setClientSearch] = useState('');
  const [listCustomerAutoComplete, setListCustomerAutoComplete] =
    useState<{ key: string; value: string }[]>();
  const [customerSelected, setCustomerSelected] = useState<any>();
  const [listProduct, setListProduct] = useState<any[]>([]);
  const theme = useTheme();

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
        products: [
          { importFees: 0, shippingFees: 0, typeCalculate: 'mu', price: 0 },
        ],
      },
      resolver: yupResolver(
        Yup.object().shape({
          taxCode: Yup.string()
            .trim()
            .max(255, 'Max 255 characters')
            .required('Hãy chọn khách hàng'),
          products: Yup.array()
            .of(
              Yup.object().shape({
                importFees: Yup.string()
                  .required('Required')
                  .matches(regexDecimal, 'NotNumber'),
                shippingFees: Yup.string()
                  .required('Required')
                  .matches(regexDecimal, 'NotNumber'),
                price: Yup.string().test(
                  'price-validation',
                  'Required and must be a valid number when typeCalculate is money',
                  function (value: any) {
                    const { typeCalculate } = this.parent; // Access sibling field
                    if (typeCalculate === 'money') {
                      return value && regexDecimal.test(value.toString()); // Validate price as string
                    }
                    return true; // No validation for other types
                  },
                ),
              }),
            )
            .required('This field is required')
            .min(1, 'At least one prompt is required'),
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
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 100px)',
        }}
      >
        {' '}
        <Box
          sx={{
            p: '20px 20px 20px',
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
            p: '20px 20px 20px',
            borderRadius: '15px',
            backgroundColor: 'rgb(250, 253, 255)',
            display: 'flex',
            flexDirection: 'column',
            gap: '29px',
          }}
        >
          <Grid container columnSpacing={2.5} rowSpacing={3}>
            <Grid item xs={12} md={6} lg={3} style={{ paddingTop: '14px' }}>
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
            <Grid item xs={12} md={6} lg={3} style={{ paddingTop: '14px' }}>
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
            <Grid item xs={12} md={6} lg={3} style={{ paddingTop: '14px' }}>
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
            <Grid item xs={12} md={6} lg={3} style={{ paddingTop: '14px' }}>
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
            <Grid item xs={12} md={6} lg={3} style={{ paddingTop: '14px' }}>
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
            <Grid item xs={12} md={6} lg={3} style={{ paddingTop: '14px' }}>
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
            <Grid item xs={12} md={6} lg={5} style={{ paddingTop: '14px' }}>
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
                            height: '60px !important',
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
          onPrevStep={onPrevStep}
          control={control}
          setValue={setValue}
        />
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '15px',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={false}
            sx={{
              mt: '24px',
              width: '461px',
              textTransform: 'capitalize',
              fontSize: '14px',
              fontWeight: '500',
              color: ' #2F2F3D',
              boxShadow:
                '0px 3.9px 3.12px 0px rgba(41, 52, 149, 0.06), 0px 9.37px 7.49px 0px rgba(41, 52, 149, 0.08), 0px 17.634px 14.114px 0px rgba(41, 52, 149, 0.10), 0px 31.46px 25.174px 0px rgba(41, 52, 149, 0.13), 0px 58.84px 47.074px 0px rgba(41, 52, 149, 0.15), 0px 140.83px 112.66px 0px rgba(41, 52, 149, 0.21)',
            }}
          >
            {`Save`}
          </Button>
          <Typography
            variant="caption"
            onClick={onPrevStep}
            sx={{
              mt: '18px',
              mb: '12px',
              color: theme.palette.warning.main,
              cursor: 'pointer',
            }}
          >
            Cancel
          </Typography>
        </Box>
      </Box>
    </>
  );
};
