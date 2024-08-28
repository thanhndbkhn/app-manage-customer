import Logo from '../Logo';
import { useLocation, useNavigate } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import styles from './Sidebar.module.css';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { IconButton } from '@mui/material';

const openedMixin = (theme: Theme): CSSObject => ({
  width: '250px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `33px`,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: '250px',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);

  console.log(location);
  const handleToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <IconButton
        onClick={handleToggle}
        sx={{
          position: 'absolute',
          top: '10%',
          left: open ? '235px' : '18px',
          zIndex: 1300,
          transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          height: '30px',
          width: '30px',

          '& > .MuiSvgIcon-root': {
            color: 'black',
            backgroundColor: 'green',
            borderRadius: "50%"
          },

          '&:hover': {
            backgroundColor: 'yellow',
          },
        }}
      >
        {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '.MuiDrawer-paper': {
            backgroundColor: 'rgb(57, 55, 76)',
          },
        }}
      >
        <div className={styles.sidenav}>
          <Logo />
          <a
            onClick={() => {
              navigate('customer');
            }}
            style={{
              background:
                location.pathname === '/customer'
                  ? 'rgb(202, 219, 45)'
                  : 'rgb(57, 55, 76)',
              borderRadius: '15px',
              cursor: 'pointer',
              color:
                location.pathname === '/customer'
                  ? 'rgba(0, 0, 0, 0.87)'
                  : 'white',
            }}
          >
            Quản lý khách hàng
          </a>
          <a
            onClick={() => {
              navigate('product');
            }}
            style={{
              background:
                location.pathname === '/product'
                  ? 'rgb(202, 219, 45)'
                  : 'rgb(57, 55, 76)',
              borderRadius: '15px',
              cursor: 'pointer',
              color:
                location.pathname === '/product'
                  ? 'rgba(0, 0, 0, 0.87)'
                  : 'white',
            }}
          >
            Quản lý sản phẩm
          </a>
          <a href="#">Quản lý kế hoạch KD</a>
        </div>
      </Drawer>
    </>
  );
}
