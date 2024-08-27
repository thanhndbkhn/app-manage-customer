import { Switch, Table, TableHead, Typography, styled } from '@mui/material';
import StyledTextField from 'common/StyledTextField';

export const TitleWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const SearchTextField = styled(StyledTextField)(({ theme }) => ({
  width: '50%',
  marginBottom: '40px',
}));

export const StyledTextFieldArea = styled(StyledTextField)(({ theme }) => ({
  '.MuiOutlinedInput-root': {
    minHeight: '100px',

    textarea: {
      height: '100% !important',
      padding: '0px',

      '&::placeholder': {
        color: 'black',
        fontWeight: 500,
      },
    },
  },
}));

// export const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
//   width: "100%",
//   minHeight: "100px",
//   borderRadius: "10px",
//   padding: "7px 13px",
//   fontSize: "14px",
//   lineHeight: "22px",
//   resize: "none",
//   borderColor: theme.palette.black[100],
// }));

export const TableWrapper = styled('div')(() => ({
  padding: '15px',
  background: '#ffffff',
  borderRadius: '15px',
}));

export const StyledTable = styled(Table)(() => ({
  '.MuiTableCell-root': {
    border: 'none',
  },
}));

export const StyledTableHead = styled(TableHead)(() => ({
  background: '#EEF0FA',
  border: 'none',

  'th:nth-of-type(1)': {
    borderTopLeftRadius: '15px',
    borderBottomLeftRadius: '15px',
  },

  'th:last-child': {
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
  },
}));

export const FlexWrapper = styled('div')(() => ({
  display: 'flex',
  alignContent: 'center',
  gap: '40px',
  width: 'fit-content',
  flexWrap: 'wrap',
}));

export const SecondFlexWrapper = styled('div')(() => ({
  display: 'flex',
  alignContent: 'center',
  width: 'fit-content',
  flexWrap: 'wrap',

  label: {
    display: 'flex',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
}));

export const FlexItem = styled('div')(() => ({
  display: 'flex',
  gap: '35px',
  alignContent: 'center',
  label: {
    margin: '0px',
    marginTop: '2px',
  },
}));

export const CancelText = styled(Typography)(() => ({
  color: '#FF9066',
  fontSize: '12px',
  cursor: 'pointer',
}));

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 45,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 1,
    display: 'block',
    width: 18,
    height: 18,
    backgroundImage: `url(/images/close-grey.png)`,
    border: 0,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: '#fff',
      border: 0,
      backgroundImage: `url(/images/tick-white.png)`,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#EEF0FA' : '#CADB2D',
        border: '1px solid #B7C627',
        opacity: 1,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#EEF0FA' : '#CADB2D',
    border: '1px solid rgba(75, 76, 90, 0.30)',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
