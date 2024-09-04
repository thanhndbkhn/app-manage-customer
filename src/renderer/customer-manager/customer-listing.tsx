import { TableRow, TableCell, TableBody } from '@mui/material';
import { usePaginationState } from 'hooks/use-pagination-state';
import { useGetListCustomer } from 'main/queries/useCustomer';
import { PaginationListing } from 'renderer/components/Pagination/pagination-listing';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';
export const CustomerListing = () => {
  const pagination = usePaginationState({
    initialPage: 1,
    initialPerPage: 15,
  });
  const { data: listCustomer } = useGetListCustomer({
    searchQuery: '',
    page: pagination.page,
    perPage: pagination.perPage,
  });
  return (
    <>
      <TableWrapper
        style={{ overflowY: 'auto', height: 'calc(100vh - 180px)' }}
      >
        <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell>Mã số thuế</TableCell>
              <TableCell
                style={{ maxWidth: '350px', minWidth: '350px' }}
                align="left"
              >
                Tên
              </TableCell>
              <TableCell
                align="left"
                style={{ maxWidth: '300px', minWidth: '300px' }}
              >
                Địa chỉ
              </TableCell>
              <TableCell align="left">Thành phố</TableCell>
              <TableCell align="left">Kiểu mua</TableCell>
              <TableCell align="left">Phân loại</TableCell>
              <TableCell align="left" style={{ minWidth: '110px' }}>
                Ngày tạo
              </TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {listCustomer && listCustomer.items.length ? (
              listCustomer.items.map((row, index) => (
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
      {listCustomer && (
        <div style={{ marginTop: '15px' }}>
          <PaginationListing
            page={pagination.page}
            perPage={pagination.perPage}
            total={listCustomer?.total}
            onNextPage={() => {
              pagination.setPage(pagination.page + 1);
            }}
            onPreviousPage={() => {
              pagination.setPage(pagination.page - 1);
            }}
          />
        </div>
      )}
    </>
  );
};
