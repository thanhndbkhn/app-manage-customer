import { TableRow, TableCell, TableBody, Button } from '@mui/material';
import { usePaginationState } from 'hooks/use-pagination-state';
import { useGetListProduct } from 'main/queries/useProduct';
import { PaginationListing } from 'renderer/components/Pagination/pagination-listing';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';

export const ProductListing = () => {
  const pagination = usePaginationState({
    initialPage: 1,
    initialPerPage: 15,
  });
  const { data: listProduct } = useGetListProduct({
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
            {listProduct && listProduct.items.length ? (
              listProduct.items.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell contentEditable component="th" scope="row">
                    {row.PRODUCT_ID}
                  </TableCell>
                  <TableCell
                    contentEditable
                    suppressContentEditableWarning={false}
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
      {listProduct && (
        <div style={{ marginTop: '15px' }}>
          <PaginationListing
            page={pagination.page}
            perPage={pagination.perPage}
            total={listProduct?.total}
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
