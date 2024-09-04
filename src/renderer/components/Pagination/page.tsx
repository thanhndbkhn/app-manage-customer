/** @format */

import { IconButton } from "@mui/material";
import { LeftIconArrow, RightIconArrow } from "assets";
import { useEffect, useState } from "react";

interface IPagination {
  total: number;
  page: number;
  perPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination = ({
  total,
  page,
  perPage,
  onNextPage,
  onPreviousPage,
}: IPagination) => {
  const [pageDisplay, setPageDisplay] = useState(0);
  useEffect(() => {
    if (perPage) {
      const pages = Math.ceil(total / perPage);
      setPageDisplay(pages);
    }
  }, [perPage, total]);
  return (
    <>
      <IconButton
        onClick={() => {
          if (page > 1) {
            onPreviousPage();
          }
        }}
        style={{
          opacity: page <= 1 ? "0.2" : "1",
          cursor: page <= 1 ? "not-allowed" : "pointer",
        }}
      >
        <LeftIconArrow />
      </IconButton>
      <span style={{ color: "#CADB2D" }}>{page}</span>/{pageDisplay}
      <IconButton
        onClick={() => {
          if (page < pageDisplay) {
            onNextPage();
          }
        }}
        style={{
          opacity: page == pageDisplay ? "0.2" : "1",
          cursor: page == pageDisplay ? "not-allowed" : "pointer",
        }}
      >
        <RightIconArrow />
      </IconButton>
    </>
  );
};
export default Pagination;
