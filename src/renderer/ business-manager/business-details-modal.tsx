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
import { useGetBusinessPlanDetails } from 'main/queries/useBusiness';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';

interface IBusinessDetailModal {
  handleClose: () => void;
  businessPlanId: number;
}
export const BusinessDetailModal = ({
  handleClose,
  businessPlanId,
}: IBusinessDetailModal) => {
  const { data: businessPlanDetails } =
    useGetBusinessPlanDetails(businessPlanId);
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
                {`Tên khách hàng:    `} Nguyễn văn A
              </Box>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                }}
              >
                <Box>{`Số PAKD:    `} Nguyễn văn A</Box>
                <Box>{`Ngày tạo:    `} Nguyễn văn A</Box>
                <Box>{`Loại PAKD:    `} Nguyễn văn A</Box>
                <Box>{`Số BG:    `} Nguyễn văn A</Box>
              </Box>
              <Box style={{ marginTop: '8px' }}>
                {`Đièu khoản thanh toán:    `} Nguyễn văn A
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
                      <TableCell align="left">Giá trị</TableCell>
                      <TableCell align="left">Ghi chú</TableCell>
                      <TableCell align="left">Tổng</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody></TableBody>{' '}
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
                <Box>{`Tổng nhập kho:    `} Nguyễn văn A</Box>
                <Box>{`Tổng giá bán:    `} Nguyễn văn A</Box>
                <Box>{`Tổng giá bán NT:    `} Nguyễn văn A</Box>
              </Box>
              <Box style={{ marginTop: '8px' }}>
                {`Thời gian bảo hành:    `} Nguyễn văn A
              </Box>
              <Box style={{ marginTop: '8px' }}>
                {`Đièu khoản thanh toán:    `} Nguyễn văn A
              </Box>
              <Box style={{ marginTop: '8px' }}>
                {`Ghi chú:    `} Nguyễn văn A
              </Box>
            </Box>
          </Card>
        </>
      </Modal>
    </>
  );
};
