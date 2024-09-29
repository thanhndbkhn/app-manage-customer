import {
  Box,
  Card,
  IconButton,
  Modal,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { CloseIcon } from 'assets';
import { convertDataCurrency, convertPriceToNumber } from 'common/helper';
import { useGetBusinessPlanDetails } from 'main/queries/useBusiness';
import { useMemo } from 'react';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';

interface IBusinessDetailModal {
  handleClose: () => void;
  businessPlanId: string;
}
export const BusinessDetailModal = ({
  handleClose,
  businessPlanId,
}: IBusinessDetailModal) => {
  const { data } = useGetBusinessPlanDetails(businessPlanId);

  const getTotalImports = useMemo(() => {
    let total = 0;
    data?.products.map((product) => {
      total +=
        product.quantity * convertPriceToNumber(product.productPrice as string);
    });
    return total;
  }, [data?.products]);

  const getTotalPriceBuy = useMemo(() => {
    let total = 0;
    data?.products.map((product) => {
      const price =
        product.typeCalculate === 'mu'
          ? product.productPrice
          : product.sellingPrice;
      total += product.quantity * convertPriceToNumber(price);
    });
    return total;
  }, [data?.products]);

  return (
    <>
      <Modal
        open={true}
        style={{ outline: 'none' }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Card
            className="card"
            style={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              outline: 'none',
              transform: 'translate(-50%, -50%)',
              background: '#FAFDFF',
              boxShadow: '24',
              width: '80%',
              height: '80%',
              padding: '30px 20px',
              marginRight: '20px',
              borderRadius: '10px',
              textAlign: 'left',
            }}
          >
            <Box style={{ position: 'relative', width: '100%', height: 1 }}>
              <IconButton
                style={{
                  position: 'absolute' as 'absolute',
                  right: 0,
                  top: '-12px',
                }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h5" align="center">
              PHƯƠNG ÁN KINH DOANH
            </Typography>

            <Box style={{ padding: '20px 30px 10px' }}>
              <Box style={{ marginTop: '8px' }}>
                {`Tên khách hàng:     `}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {data?.businessPlanResult.CUSTOMER_NAME}
              </Box>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                }}
              >
                <Box>
                  {`Số PAKD:    `}{' '}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {data?.businessPlanResult.BUSINESS_PLAN_ID}
                </Box>
                <Box>
                  {`Ngày tạo:    `}{' '}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {data?.businessPlanResult.CREATED_AT}
                </Box>
                <Box>
                  {`Loại PAKD:    `}{' '}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {data?.businessPlanResult.CLASSIFY}
                </Box>
                <Box>
                  {`Số BG:    `}{' '}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {data?.businessPlanResult.BUSINESS_PLAN_ID}
                </Box>
              </Box>
              <Box style={{ marginTop: '8px' }}>
                {`Điều khoản thanh toán:    `}{' '}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {data?.businessPlanResult.PAYMENT_TERMS}
              </Box>
            </Box>
            <>
              <TableWrapper
                style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 600px)' }}
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
                      <TableCell align="left">Giá bán ra</TableCell>
                      <TableCell align="left">Ghi chú</TableCell>
                      <TableCell align="left">Tổng</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {data?.products?.map((product) => {
                      return (
                        <TableRow>
                          <TableCell align="left">
                            {product.productName}
                          </TableCell>
                          <TableCell align="left">{product.quantity}</TableCell>
                          <TableCell align="left">
                            {product.productPrice}
                          </TableCell>
                          <TableCell align="left">
                            {product.foreignCurrencySell}
                          </TableCell>
                          <TableCell align="left">
                            {product.coefficientEW}
                          </TableCell>
                          <TableCell align="left">
                            {product.shippingFees}
                          </TableCell>
                          <TableCell align="left">
                            {' '}
                            {product.importFees}
                          </TableCell>
                          <TableCell align="left">
                            {' '}
                            {product.typeCalculate === 'mu' ? 'MU' : 'Tiền'}
                          </TableCell>
                          <TableCell align="left">
                            {product.sellingPrice}
                          </TableCell>
                          <TableCell align="left">
                            {' '}
                            {product.detailsNote}
                          </TableCell>
                          <TableCell align="left">
                            {' '}
                            {product.total.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>{' '}
                </StyledTable>
              </TableWrapper>
            </>
            <Box style={{ padding: '20px 30px 10px' }}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                }}
              >
                <Box>
                  {`Tổng nhập kho:    `}{' '}
                  {getTotalImports?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Box>
                <Box>
                  {`Tổng giá bán:    `}{' '}
                  {getTotalPriceBuy?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Box>
                <Box>{`Tổng giá bán NT:    `} </Box>
              </Box>
              <Box style={{ marginTop: '8px' }}>
                {`Thời gian bảo hành:    `}{' '}
                {data?.businessPlanResult.NUMBER_MAINTENANCE_TIMES}
              </Box>
              <Box style={{ marginTop: '8px' }}>
                {`Điều khoản thanh toán:    `}{' '}
                {data?.businessPlanResult.PAYMENT_TERMS}
              </Box>
              <Box style={{ marginTop: '8px' }}>
                {`Ghi chú:    `} {data?.businessPlanResult.BUSINESS_NOTE}
              </Box>
            </Box>
          </Card>
        </>
      </Modal>
    </>
  );
};
