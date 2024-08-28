import Logo from '../Logo';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  return (
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
            location.pathname === '/customer' ? 'rgba(0, 0, 0, 0.87)' : 'white',
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
            location.pathname === '/product' ? 'rgba(0, 0, 0, 0.87)' : 'white',
        }}
      >
        Quản lý sản phẩm
      </a>
      <a href="#">Quản lý kế hoạch KD</a>
    </div>
  );
}
