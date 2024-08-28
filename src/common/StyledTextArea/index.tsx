import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledTextArea = styled(TextField)<TextFieldProps>(({ theme }) => ({
  height: 'auto',
  width: '100%',

  '.MuiOutlinedInput-root': {
    borderRadius: '10px',
    height: '94px',
    padding: '7px 13px',
    fontSize: '14px',
    lineHeight: '22px',

    '&.Mui-disabled': {
      background: '#E9EBF8',
    },
  },

  textarea: {
    height: '100% !important',
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

export default StyledTextArea;
