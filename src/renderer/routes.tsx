import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProductManager } from './product-manager/product-manager';

import Home from './views/Home';
import styles from './views/Home/Home.module.css';
import Sidebar from './components/Sidebar';
import { Header } from './components/Header';
import { Box } from '@mui/material';
import ReactQueryProvider from 'main/queries/ReactQueryProvider';

export default function appRoutes() {
  return (
    <MemoryRouter>
      <div className={styles.container}>
        <Sidebar />
        <Box
          style={{
            backgroundColor: '#39374C',
            width: 'calc(100% - 240px)',
          }}
        >
          <Box
            style={{
              borderBottomLeftRadius: '25px',
              borderTopLeftRadius: '25px',
              background: 'rgb(241, 245, 251)',
              height: '100vh',
              padding: '25px',
            }}
          >
            <ReactQueryProvider>
              <Header />
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="product" Component={ProductManager} />
              </Routes>
            </ReactQueryProvider>
          </Box>
        </Box>
      </div>
    </MemoryRouter>
  );
}
