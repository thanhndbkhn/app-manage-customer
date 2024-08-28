import { TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useGetListProduct } from 'main/queries/useProduct';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';

export const ProductListing = () => {
  const { data: listProduct } = useGetListProduct();
  return (
    <>
      <TableWrapper>
        <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell
                align="left"
                style={{ maxWidth: '200px', minWidth: '200px' }}
              >
                Tên
              </TableCell>
              <TableCell align="left">Công ty</TableCell>
              <TableCell align="left">Mã ERP</TableCell>
              <TableCell align="left">Giá</TableCell>
              <TableCell align="left">Mã NCC</TableCell>
              <TableCell align="left">Ngoại tệ</TableCell>
              <TableCell align="left">Hệ số EW</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {listProduct && listProduct.length ? (
              listProduct.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.PRODUCT_ID}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ maxWidth: '200px', minWidth: '200px' }}
                  >
                    {row.PRODUCT_NAME}
                  </TableCell>
                  <TableCell align="left">{row.COMPANY}</TableCell>
                  <TableCell align="left">{row.ERP_CODE}</TableCell>
                  <TableCell align="left">{row.PRICE}</TableCell>
                  <TableCell align="left">{row.NCC_CODE}</TableCell>
                  <TableCell align="left">{row.FOREIGN_CURRENCY}</TableCell>
                  <TableCell align="left">{row.COEFFICIENT_EW}</TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </StyledTable>
      </TableWrapper>
    </>
  );
};
