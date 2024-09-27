import { TableRow, TableCell, TableBody } from '@mui/material';
import { usePaginationState } from 'hooks/use-pagination-state';
import { useGetListBusiness } from 'main/queries/useBusiness';
import { PaginationListing } from 'renderer/components/Pagination/pagination-listing';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';
import { BusinessDetailModal } from './business-details-modal';
import { useState } from 'react';

export const BusinessListing = () => {
  const pagination = usePaginationState({
    initialPage: 1,
    initialPerPage: 15,
  });
  const { data: listBusiness } = useGetListBusiness({
    searchQuery: '',
    page: pagination.page,
    perPage: pagination.perPage,
  });

  const [businessPlanId, setBusinessPlanId] = useState(0);

  return (
    <>
      <TableWrapper
        style={{ overflowY: 'auto', height: 'calc(100vh - 180px)' }}
      >
        <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell
                align="left"
                style={{ maxWidth: '300px', minWidth: '300px' }}
              >
                Tên sản phẩm
              </TableCell>
              <TableCell align="left">Địa Chỉ</TableCell>
              <TableCell align="left">Số báo giá</TableCell>
              <TableCell align="left">Dự án</TableCell>
              <TableCell align="left">Trạng thái </TableCell>
              <TableCell align="left">Thời gian bảo hành</TableCell>
              <TableCell align="left">Ngày tạo</TableCell>
              <TableCell align="left">Tổng tiền</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {listBusiness && listBusiness.items.length ? (
              listBusiness.items.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    setBusinessPlanId(row.BUSINESS_PLAN_ID);
                  }}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.BUSINESS_PLAN_ID}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ maxWidth: '200px', minWidth: '200px' }}
                  >
                    {row.CUSTOMER_NAME}
                  </TableCell>
                  <TableCell align="left">{row.CUSTOMER_ADDRESS}</TableCell>
                  <TableCell align="left">{row.QUOTE_NUMBER}</TableCell>
                  <TableCell align="left">{row.PROJECT}</TableCell>
                  <TableCell align="left">{row.STATUS}</TableCell>
                  <TableCell align="left">{row.WARRANTY_PERIOD}</TableCell>
                  <TableCell align="left">{row.CREATED_AT}</TableCell>
                  <TableCell align="left">
                    {row.TOTAL_SELLING_PRICE &&
                      row.TOTAL_SELLING_PRICE.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </StyledTable>
      </TableWrapper>
      {listBusiness && (
        <div style={{ marginTop: '15px' }}>
          <PaginationListing
            page={pagination.page}
            perPage={pagination.perPage}
            total={listBusiness?.total}
            onNextPage={() => {
              pagination.setPage(pagination.page + 1);
            }}
            onPreviousPage={() => {
              pagination.setPage(pagination.page - 1);
            }}
          />
        </div>
      )}
      {businessPlanId && (
        <BusinessDetailModal
          handleClose={() => {
            setBusinessPlanId(0);
          }}
          businessPlanId={businessPlanId}
        />
      )}
    </>
  );
};
