/** @format */

import { FormLabel } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  height: 'auto',
  width: '100%',

  '.MuiOutlinedInput-root': {
    borderRadius: '10px',
    height: '36px',
    padding: '7px 13px',
    fontSize: '14px',
    lineHeight: '22px',
    background: '#fafdff',
    '&.Mui-disabled': {
      background: '#E9EBF8',
    },
  },

  '.MuiInputAdornment-root': {
    '& > button': {
      padding: '0px',

      '& > svg': {
        color: 'black',
      },
    },
  },

  input: {
    height: '100%',
    padding: '0px',

    '&::placeholder': {
      color: '#BDBEC7',
      fontWeight: 500,
    },
  },

  fieldSet: {
    borderRadius: '10px',
    borderColor: 'rgba(75, 76, 90, 0.3)',
  },
}));

export default StyledTextField;

export const TextFieldLabel = styled(FormLabel)(({ theme }) => ({
  marginLeft: '13px',
  marginBottom: '9px',
  fontSize: '13px',
  lineHeight: '16px',
  fontWeight: 500,
  color: '#2F2F3D',

  '.MuiFormLabel-asterisk': {
    color: 'red',
  },
}));
