import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import StyledTextField, { TextFieldLabel } from 'common/StyledTextField';
import DropdownSelect from 'common/DropdownSelect/dropdown-select';
import StyledTextArea from 'common/StyledTextArea';
import { useCreateCustomer } from 'main/queries/useCustomer';
interface ICreateCustomer {
  onPrevStep: () => void;
}

interface ICreateCustomerInput {
  taxCode: string;
  customerName: string;
  classify?: string;
  typeBuy?: string;
  address: string;
  city: string;
}

export const CustomerCreate = ({ onPrevStep }: ICreateCustomer) => {
  const theme = useTheme();
  const { mutateAsync: createCustomer } = useCreateCustomer();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    watch,
    setError,
  } = useForm<ICreateCustomerInput>({
    mode: 'all',
    defaultValues: {
      taxCode: '',
      customerName: '',
      classify: '',
      typeBuy: '',
      address: '',
      city: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        taxCode: Yup.string()
          .trim()
          .max(15, 'Tối đa 15 ký tự')
          .required('Hãy nhập mã số thuế'),
        customerName: Yup.string()
          .trim()
          .max(255, 'Max 255 characters')
          .required('Hãy nhập tên  '),
        // classify: Yup.string().required('Chọn loại khách hàng'),
        // typeBuy: Yup.string().required('Chọn kiểu mua'),
        address: Yup.string().required('Nhập địa chỉ'),
        city: Yup.string().required('Nhập thành phố'),
      }),
    ),
  });

  const handleSubmitForm = () => {
    const taxCode = getValues('taxCode');
    const customerName = getValues('customerName');
    const classify = getValues('classify');
    const typeBuy = getValues('typeBuy');
    const address = getValues('address');
    const city = getValues('city');
    const data = {
      taxCode,
      customerName,
      classify,
      typeBuy,
      address,
      city,
    };

    createCustomer(data, {
      onSuccess: () => {
        onPrevStep();
      },
      onError: (error: any) => {},
    });
  };

  const handleSelectType = (key: string, value: string | undefined) => {
    setValue('classify', key);
  };

  const handleSelectTypeBuy = (key: string, value: string | undefined) => {
    setValue('typeBuy', key);
  };

  return (
    <>
      <Box
        style={{ padding: '25px', background: '#ffffff', borderRadius: '15px' }}
      >
        <Box sx={{ pb: '12px', mb: '11px' }}>
          <Typography variant="h5">Tạo khách hàng</Typography>
        </Box>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Grid container columnSpacing={2.5} rowSpacing={3}>
            <Grid item xs={12} md={6} lg={5}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>
                  Tên khách hàng
                </TextFieldLabel>
                <Controller
                  control={control}
                  name={`customerName`}
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
            <Grid item xs={12} md={6} lg={5}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>Mã số thuế</TextFieldLabel>
                <Controller
                  control={control}
                  name={`taxCode`}
                  render={({ field, fieldState: { error } }) => (
                    <StyledTextField
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder="Mã số thuế"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item lg={2} sx={{ display: { lg: 'block', xs: 'none' } }} />
            <Grid item xs={12} md={6} lg={5}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>
                  Loại khách hàng
                </TextFieldLabel>
                <Controller
                  control={control}
                  name={`classify`}
                  render={({ field, fieldState: { error } }) => (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: '222px',
                        minWidth: '250px',
                      }}
                    >
                      <DropdownSelect
                        {...field}
                        styleCustom={{ maxWidth: '222px', minWidth: '250px' }}
                        listData={[
                          { key: 'Trading', value: 'Trading' },
                          { key: 'Industry', value: 'Industry' },
                        ]}
                        onSelect={handleSelectType}
                        valueDefault={''}
                        error={Boolean(error)}
                        helperText={error?.message}
                        placeHolder={'Phân loại'}
                      />
                    </Box>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>
                  Hình thức bán
                </TextFieldLabel>
                <Controller
                  control={control}
                  name={`typeBuy`}
                  render={({ field, fieldState: { error } }) => (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: '222px',
                        minWidth: '250px',
                      }}
                    >
                      <DropdownSelect
                        {...field}
                        styleCustom={{ maxWidth: '222px', minWidth: '250px' }}
                        listData={[{ key: 'Direct', value: 'Direct' }]}
                        onSelect={handleSelectTypeBuy}
                        valueDefault={''}
                        error={Boolean(error)}
                        helperText={error?.message}
                        placeHolder={'Hình thức bán'}
                      />
                    </Box>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item lg={2} sx={{ display: { lg: 'block', xs: 'none' } }} />
            <Grid item xs={12} md={6} lg={5}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>Địa chỉ</TextFieldLabel>
                <Controller
                  control={control}
                  name={`address`}
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
                        placeholder="Nhập địa chỉ"
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
            <Grid item lg={7} sx={{ display: { lg: 'block', xs: 'none' } }} />
            <Grid item xs={12} md={6} lg={5}>
              <FormControl fullWidth>
                <TextFieldLabel sx={{ ml: '0px' }}>Thành phố</TextFieldLabel>
                <Controller
                  control={control}
                  name={`city`}
                  render={({ field, fieldState: { error } }) => (
                    <Box
                      style={{
                        width: '100%',
                      }}
                    >
                      <StyledTextField
                        {...field}
                        type="text"
                        autoComplete="off"
                        placeholder="Thành phố"
                        error={Boolean(error)}
                        helperText={error?.message}
                      />
                    </Box>
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
    </>
  );
};
