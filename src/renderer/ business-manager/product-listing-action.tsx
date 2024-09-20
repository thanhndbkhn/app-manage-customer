import {
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { AddItem } from 'assets';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';
import { ProductEdit } from './component-edit/product-edit';
import StyledTextField from 'common/StyledTextField';

interface IProductListingAction {
  listProduct: any[];
  setListProduct: (list: any[]) => void;
  addProduct: () => void;
  onPrevStep: () => void;
}

export const ProductListingAction = ({
  listProduct,
  setListProduct,
  addProduct,
  onPrevStep,
}: IProductListingAction) => {
  const onChangeProduct = (index: number, product: any) => {
    const updatedList = [...listProduct];
    updatedList[index] = product;
    setListProduct(updatedList);
  };
  return (
    <Box>
      <TableWrapper
        style={{
          // overflowY: 'auto',
          // maxHeight: '300px',
          marginTop: '15px',
        }}
      >
        <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell align="left">Tên sản phẩm</TableCell>
              <TableCell align="left">Số lượng</TableCell>
              <TableCell align="left">Giá</TableCell>
              <TableCell align="left">Ngoại tệ</TableCell>
              <TableCell align="left">Hệ số EW</TableCell>
              <TableCell align="left">Phí VC</TableCell>
              <TableCell align="left">Phí NK</TableCell>
              <TableCell align="left">Cách tính</TableCell>
              <TableCell align="left">MU</TableCell>
              <TableCell align="left">Tổng</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {listProduct.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell align="left" style={{ position: 'relative' }}>
                    <ProductEdit
                      index={index}
                      key={item.PRODUCT_ID || index}
                      keyData={item.PRODUCT_ID || index}
                      onChange={onChangeProduct}
                      valueDefault={item.PRODUCT_NAME}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <StyledTextField
                      key={item.QUANTITY || index}
                      // keyData={item.QUANTITY || index}
                      type="number"
                      style={{ width: '80px' }}
                      autoComplete="off"
                      placeholder={'Weight'}
                      value={item?.QUANTITY || 0}
                    />
                  </TableCell>
                  <TableCell align="left">{item.PRICE}</TableCell>
                  <TableCell align="left">{item.FOREIGN_CURRENCY}</TableCell>
                  <TableCell align="left">{item.COEFFICIENT_EW}</TableCell>
                  <TableCell align="left">{item.COEFFICIENT_EW}</TableCell>
                  <TableCell align="left">{item.COEFFICIENT_EW}</TableCell>
                  <TableCell align="left">{item.COEFFICIENT_EW}</TableCell>
                  <TableCell align="left">MU</TableCell>
                  <TableCell align="left">Tổng</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <AddItem style={{ cursor: 'pointer' }} onClick={() => addProduct()} />
        </StyledTable>
      </TableWrapper>
    </Box>
  );
};
