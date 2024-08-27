import { Box, FormControl, Grid, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTextField, { TextFieldLabel } from 'common/StyledTextField';
import DropdownSelect from 'common/DropdownSelect/dropdown-select';
import { useGetListCurrencyBuy } from 'main/queries/useCurrency';
import { useEffect, useState } from 'react';
import { convertDataCurrency } from 'common/helper';

interface ICreateProduct {
  nccCode: string;
  erpCode: string;
  productName: string;
  price: string;
  currency: string;
  company: string;
}

const numberValidation = Yup.string()
  .test('is-valid-number', 'Invalid number format', (value) => {
    if (!value) return false;

    // Allow numbers without commas, as well as properly formatted numbers with commas
    const validPattern = /^(\d+|\d{1,3}(,\d{3})*)(\.\d{1,2})?$/;

    if (!validPattern.test(value)) return false;

    return true;
  })
  .transform((value) => {
    if (value) {
      // Remove any commas for processing
      const rawValue = value.replace(/,/g, '');

      // Convert to number for formatting
      const number = parseFloat(rawValue);

      // Format number with commas and two decimal places
      return number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return value;
  });

// const validationSchema = Yup.object().shape({
//   amount: numberValidation.required('Amount is required'),
// });

export const ProductCreate = () => {
  const { data: listCurrencyBuy } = useGetListCurrencyBuy();
  const [listCurrencySelect, setListCurrencySelect] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    if (listCurrencyBuy) {
      setListCurrencySelect(convertDataCurrency(listCurrencyBuy));
    }
  }, [listCurrencyBuy]);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    watch,
    setError,
  } = useForm<ICreateProduct>({
    mode: 'all',
    defaultValues: {
      nccCode: '',
      erpCode: '',
      price: '',
      currency: '',
      company: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        nccCode: Yup.string()
          .trim()
          .max(15, 'Tối đa 15 ký tự')
          .required('Hãy nhập mã nhà cung cấp'),
        erpCode: Yup.string()
          .trim()
          .max(255, 'Max 255 characters')
          .required('Hãy nhập mã ERP '),
        productName: Yup.string()
          .trim()
          .max(255, 'Max 255 characters')
          .required('Hãy nhập tên'),
        price: numberValidation
          .trim()
          .max(255, 'Max 255 characters')
          .required('Hãy nhập giá'),
        currency: Yup.string()
          .required('Chọn ngoại tệ')
          .min(8, 'Password must have 8 characters long'),
        company: Yup.string().required('Nhập tên hãng'),
      }),
    ),
  });
  const handleSelectType = (key: string, value: string | undefined) => {
    setValue('currency', key);
    clearErrors('currency');
  };

  const handleSubmitForm = () => {};
  return (
    <Box
      style={{ padding: '25px', background: '#ffffff', borderRadius: '15px' }}
    >
      <Box sx={{ pb: '12px', mb: '11px' }}>
        <Typography variant="h5">Tạo sản phẩm</Typography>
      </Box>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Grid container columnSpacing={2.5} rowSpacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <TextFieldLabel sx={{ ml: '0px' }}>Tên sản phẩm</TextFieldLabel>
              <Controller
                control={control}
                name={`productName`}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Nhập tên sản phẩm"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <TextFieldLabel sx={{ ml: '0px' }}>Nhà cung cấp</TextFieldLabel>
              <Controller
                control={control}
                name={`nccCode`}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Nhập NCC code"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item lg={4} sx={{ display: { lg: 'block', xs: 'none' } }} />
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <TextFieldLabel sx={{ ml: '0px' }}>Mã ERP</TextFieldLabel>
              <Controller
                control={control}
                name={`erpCode`}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Nhập ERP code"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <TextFieldLabel sx={{ ml: '0px' }}>Hãng</TextFieldLabel>
              <Controller
                control={control}
                name={`company`}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Vui lòng nhập hãng"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item lg={4} sx={{ display: { lg: 'block', xs: 'none' } }} />

          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <TextFieldLabel sx={{ ml: '0px' }}>Giá</TextFieldLabel>
              <Controller
                control={control}
                name={`price`}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Hãy nhập giá"
                    error={Boolean(error)}
                    helperText={error?.message}
                    onBlur={(e) => {
                      const rawValue = e.target.value.replace(/,/g, '');
                      const number = parseFloat(rawValue);
                      if (isNaN(number)) {
                        setError('price', {
                          message: 'Kiểu dữ liệu không đúng',
                        });
                      } else {
                        const formattedValue = number.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        });

                        // Update the field value with the formatted number
                        setValue('price', formattedValue);
                        clearErrors('price');
                      }
                      // Format the number with commas and two decimal places
                    }}
                    onChange={(e) => {
                      setValue('price', e.target.value);
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={9} md={4} lg={2}>
            <FormControl fullWidth>
              <TextFieldLabel sx={{ ml: '0px' }}>Tiền tệ</TextFieldLabel>
              <Controller
                control={control}
                name={`currency`}
                render={({ field, fieldState: { error } }) => (
                  <DropdownSelect
                    {...field}
                    styleCustom={{ maxWidth: '222px', minWidth: '250px' }}
                    listData={listCurrencySelect}
                    onSelect={handleSelectType}
                    valueDefault={''}
                    error={Boolean(error)}
                    helperText={error?.message}
                    placeHolder={'Currency'}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
