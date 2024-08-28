/** @format */

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledTextChatArea = styled(TextField)<TextFieldProps>(({ theme }) => ({
  height: 'auto',
  width: '100%',
  minHeight: '40px',

  '.MuiOutlinedInput-root': {
    borderRadius: '10px',
    padding: '7px 13px',
    fontSize: '14px',
    lineHeight: '22px',

    '&.Mui-disabled': {
      background: '#E9EBF8',
    },
  },

  textarea: {
    padding: '2px',
    '&::placeholder': {
      color: '#BDBEC7',
      fontWeight: 500,
      textAlign: 'center',
      // height: "40px",
      // lineHeight: "22px",
    },
  },

  fieldSet: {
    borderRadius: '10px',
    borderColor: 'rgba(75, 76, 90, 0.3)',
  },
}));

export default StyledTextChatArea;
