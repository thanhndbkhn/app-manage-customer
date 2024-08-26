import Logo from '../Logo';
import { useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.css';

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className={styles.sidenav}>
      <Logo />
      <a
        onClick={() => {
          navigate('product');
        }}
      >
        Quản lý khách hàng
      </a>
      <a href="#">Quản lý sản phẩm</a>
      <a href="#">Quản lý kế hoạch KD</a>
    </div>
  );
}
