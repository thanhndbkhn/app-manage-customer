import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProductManager } from './product-manager/product-manager';

import Home from './views/Home';
import styles from './views/Home/Home.module.css';
import Sidebar from './components/Sidebar';
import { Header } from './components/Header';
import { Box } from '@mui/material';
import ReactQueryProvider from 'main/queries/ReactQueryProvider';
import ThemeRegistry from './theme/ThemeRegistry';
import { CustomerManager } from './customer-manager/customer-manager';

export default function appRoutes() {
  return (
    <MemoryRouter>
      <div className={styles.container}>
        <Sidebar />
        <Box
          style={{
            backgroundColor: '#39374C',
            width: '100%',
          }}
        >
          <Box
            style={{
              borderBottomLeftRadius: '25px',
              borderTopLeftRadius: '25px',
              background: 'rgb(241, 245, 251)',
              height: '100vh',
              padding: '0 25px',
              overflow: 'hidden',
            }}
          >
            <ThemeRegistry>
              <ReactQueryProvider>
                <Header />
                <Routes>
                  <Route path="/">
                    <Route index element={<Navigate to="customer" replace />} />
                    <Route path="product" Component={ProductManager} />
                    <Route path="customer" Component={CustomerManager} />
                  </Route>
                </Routes>
              </ReactQueryProvider>
            </ThemeRegistry>
          </Box>
        </Box>
      </div>
    </MemoryRouter>
  );
}
