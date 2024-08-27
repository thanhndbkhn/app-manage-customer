/** @format */

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
      color: 'black',
      fontWeight: 500,
    },
  },

  fieldSet: {
    borderRadius: '10px',
    borderColor: 'black',
  },
}));

export default StyledTextField;
