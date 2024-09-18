import { TableRow, TableCell, TableBody } from '@mui/material';
import { AddItem } from 'assets';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';
import { ProductEdit } from './component-edit/product-edit';

interface IProductListingAction {
  listProduct: any[];
  setListProduct: (list: any[]) => void;
  addProduct: () => void;
}

export const ProductListingAction = ({
  listProduct,
  setListProduct,
  addProduct,
}: IProductListingAction) => {
  const onChangeProduct = (idMaterial: string, key: string) => {};
  return (
    <>
      <TableWrapper
        style={{
          overflowY: 'auto',
          height: 'calc(100vh - 180px)',
          marginTop: '15px',
          position: 'relative',
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
                  <TableCell align="left">
                    <ProductEdit
                      key={item.TAX_CODE || index}
                      keyData={item.TAX_CODE || index}
                      onChange={onChangeProduct}
                      valueDefault={''}
                    />
                  </TableCell>
                  <TableCell align="left">Số lượng</TableCell>
                  <TableCell align="left">Giá</TableCell>
                  <TableCell align="left">Ngoại tệ</TableCell>
                  <TableCell align="left">Hệ số EW</TableCell>
                  <TableCell align="left">Phí VC</TableCell>
                  <TableCell align="left">Phí NK</TableCell>
                  <TableCell align="left">Cách tính</TableCell>
                  <TableCell align="left">MU</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <AddItem style={{ cursor: 'pointer' }} onClick={() => addProduct()} />
        </StyledTable>
      </TableWrapper>
    </>
  );
};
