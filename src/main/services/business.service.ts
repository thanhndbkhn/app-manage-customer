export async function getListBusiness(params: {
  searchQuery: string;
  page: number;
  perPage: number;
}) {
  const offset = (params.page - 1) * params.perPage;

  const countSql = `
    SELECT COUNT(*) as totalItems FROM BUSINESS_PLAN BP
    JOIN CUSTOMER C ON BP.TAX_CODE = C.TAX_CODE
    WHERE C.CUSTOMER_NAME LIKE ?;`;

  const totalResult = await window.electron.queryDatabase(countSql, [
    `%${params.searchQuery || ''}%`,
  ]);

  const totalItems = totalResult[0].totalItems;
  const totalPages = Math.ceil(totalItems / params.perPage);
  const result = await window.electron.queryDatabase(
    `SELECT BP.*, C.CUSTOMER_NAME, C.CITY as CUSTOMER_ADDRESS, SUM(CAST(REPLACE(BPD.SELLING_PRICE, ',', '') AS REAL))  AS TOTAL_SELLING_PRICE
    FROM BUSINESS_PLAN BP
    JOIN CUSTOMER C ON BP.TAX_CODE = C.TAX_CODE
    LEFT JOIN BUSINESS_PLAN_DETAILS BPD ON BP.BUSINESS_PLAN_ID = BPD.BUSINESS_PLAN_ID
    WHERE C.CUSTOMER_NAME LIKE ?
    GROUP BY BP.BUSINESS_PLAN_ID
    ORDER BY BP.BUSINESS_PLAN_ID ASC, BP.TAX_CODE ASC
    LIMIT ? OFFSET ?`,
    [
      `%${params.searchQuery || ''}%`, // For CUSTOMER_NAME
      params.perPage,
      offset,
    ],
  );
  return {
    items: result,
    pageCount: totalPages,
    total: totalItems,
  };
}
