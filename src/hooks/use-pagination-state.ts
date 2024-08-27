/** @format */

import { noop, useStableCallback } from "@reach/utils";
import * as React from "react";

export interface PaginationState {
  page: number;
  perPage: number;
  isLastPage: boolean;
}

export interface UsePaginationStateOptions {
  /**
   * @default 1
   */
  initialPage?: number;
  /**
   * @default 5
   */
  initialPerPage?: number;
  initialIsLastPage?: boolean;
  onChange?: (latestState: PaginationState) => void;
}

export const usePaginationState = ({
  initialPage,
  initialPerPage,
  initialIsLastPage,
  onChange = noop,
}: UsePaginationStateOptions = {}) => {
  const [state, setState] = React.useState<PaginationState>(() => ({
    page: initialPage ?? 1,
    perPage: initialPerPage ?? 5,
    isLastPage: initialIsLastPage ?? false,
  }));

  const setPage = useStableCallback(function setPage(page: number) {
    const latestState = {
      ...state,
      page,
      isLastPage: false,
    };

    setState(latestState);
    onChange(latestState);
  });

  const setPerPage = useStableCallback(function setPerPage(perPage: number) {
    const latestState = {
      ...state,
      page: 1,
      perPage,
    };

    setState(latestState);
    onChange(latestState);
  });

  const setIsLastPage = useStableCallback(function setIsLastPage(
    isLastPage: boolean
  ) {
    const latestState = {
      ...state,
      isLastPage,
    };
    setState(latestState);
    onChange(latestState);
  });

  return React.useMemo(
    () => ({
      page: state.page,
      perPage: state.perPage,
      isLastPage: state.isLastPage,
      setPage,
      setPerPage,
      setIsLastPage,
    }),
    [state, setPage, setPerPage, setIsLastPage]
  );
};
