import { TableRow, TableCell, TableBody } from '@mui/material';
import { useGetListCustomer } from 'main/queries/useCustomer';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';
export const CustomerListing = () => {
  const { data: listCustomer } = useGetListCustomer();
  console.log(listCustomer);
  return (
    <>
      <TableWrapper>
        <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell>Mã số thuế</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell
                align="left"
                style={{ maxWidth: '200px', minWidth: '200px' }}
              >
                Địa chỉ
              </TableCell>
              <TableCell align="left">Thành phố</TableCell>
              <TableCell align="left">Kiểu mua</TableCell>
              <TableCell align="left">Phân loại</TableCell>
              <TableCell align="left">Ngày tạo</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {listCustomer && listCustomer.length ? (
              listCustomer.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.TAX_CODE}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ maxWidth: '200px', minWidth: '200px' }}
                  >
                    {row.CUSTOMER_NAME}
                  </TableCell>
                  <TableCell align="left">{row.ADDRESS}</TableCell>
                  <TableCell align="left">{row.CITY}</TableCell>
                  <TableCell align="left">{row.TYPE_BUY}</TableCell>
                  <TableCell align="left">{row.CLASSIFY}</TableCell>
                  <TableCell align="left">{row.CREATED_AT}</TableCell>
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
