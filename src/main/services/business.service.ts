export async function getListBusiness(params: {
  searchQuery: string;
  page: number;
  perPage: number;
}) {
  const offset = (params.page - 1) * params.perPage;

  const countSql = `
    SELECT COUNT(*) as totalItems FROM BUSINESS_PLAN_DETAILS
    WHERE ERP_CODE LIKE ?;`;

  const totalResult = await window.electron.queryDatabase(countSql, [
    `%${params.searchQuery || ''}%`,
  ]);

  const totalItems = totalResult[0].totalItems;
  const totalPages = Math.ceil(totalItems / params.perPage);
  const result = await window.electron.queryDatabase(
    `SELECT * FROM BUSINESS_PLAN_DETAILS WHERE ERP_CODE LIKE ?
    ORDER BY ERP_CODE ASC
    LIMIT ? OFFSET ?`,
    [
      `%${params.searchQuery || ''}%`, // For ERP_CODE
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
