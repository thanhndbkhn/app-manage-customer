/** @format */

import { Box } from "@mui/material";
import Pagination from "./page";

interface PaginationListingProps {
  total: number;
  page: number;
  perPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}
export const PaginationListing = ({
  total,
  page,
  perPage,
  onNextPage,
  onPreviousPage,
}: PaginationListingProps) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          color: "black",
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        {`Hiển thị ${(page - 1) * perPage + 1} đến  ${
          page * perPage < total ? page * perPage : total
        } trong ${total} kết quả`}
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <span>Trang</span>
        <Pagination
          page={page}
          perPage={perPage}
          total={total}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </Box>
    </Box>
  );
};
