import {
  Box,
  Button,
  FormControl,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTextField, { TextFieldLabel } from 'common/StyledTextField';
import DropdownSelect from 'common/DropdownSelect/dropdown-select';
import { useGetListCurrencyBuy } from 'main/queries/useCurrency';
import { useEffect, useState } from 'react';
import { convertDataCurrency } from 'common/helper';
import { useCreateProduct } from 'main/queries/useProduct';

interface ICreateProduct {
  nccCode: string;
  erpCode: string;
  productName: string;
  price: string;
  currency: string;
  company: string;
  coefficientEW: number;
}

interface IProductCreate {
  onPrevStep: () => void;
}

export const numberValidation = Yup.string()
  .test('is-valid-number', 'Kiểu dữ liệu không đúng', (value) => {
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

export const ProductCreate = ({ onPrevStep }: IProductCreate) => {
  const { data: listCurrencyBuy } = useGetListCurrencyBuy();
  const { mutateAsync: createProduct } = useCreateProduct();

  const [listCurrencySelect, setListCurrencySelect] = useState<
    { key: string; value: string }[]
  >([]);
  const theme = useTheme();

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
        currency: Yup.string().required('Chọn ngoại tệ'),
        company: Yup.string().required('Nhập tên hãng'),
        coefficientEW: Yup.number().required('Hãy nhập hệ số EW'),
      }),
    ),
  });
  const handleSelectType = (key: string, value: string | undefined) => {
    setValue('currency', key);
    clearErrors('currency');
  };

  const handleSubmitForm = () => {
    const nccCode = getValues('nccCode');
    const erpCode = getValues('erpCode');
    const productName = getValues('productName');
    const price = getValues('price');
    const currency = getValues('currency');
    const company = getValues('company');
    const coefficientEW = getValues('coefficientEW');
    const data = {
      nccCode,
      erpCode,
      productName,
      currency,
      price,
      company,
      coefficientEW,
    };
    createProduct(data, {
      onSuccess: () => {
        onPrevStep();
      },
      onError: (error: any) => {},
    });
  };
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
          <Grid item lg={4} sx={{ display: { lg: 'block', xs: 'none' } }} />
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <TextFieldLabel sx={{ ml: '0px' }}>Hệ số EW (%)</TextFieldLabel>
              <Controller
                control={control}
                name={`coefficientEW`}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Nhập hệ sô EW"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
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
      </form>
    </Box>
  );
};
