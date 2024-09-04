import { generateEntityId } from 'common/helper';

export interface IProduct {
  TAX_CODE?: string;
  CUSTOMER_NAME: string;
  CLASSIFY: string;
  TYPE_BUY: string;
  ADDRESS: string;
  CITY: string;
  CREATED_AT: string;
}

export async function getListProduct(params: {
  searchQuery: string;
  page: number;
  perPage: number;
}) {
  const offset = (params.page - 1) * params.perPage;

  const countSql = `
    SELECT COUNT(*) as totalItems FROM PRODUCT
    WHERE PRODUCT_NAME LIKE ?;`;

  const totalResult = await window.electron.queryDatabase(countSql, [
    `%${params.searchQuery || ''}%`,
  ]);

  const totalItems = totalResult[0].totalItems;
  const totalPages = Math.ceil(totalItems / params.perPage);
  const result = await window.electron.queryDatabase(
    `SELECT * FROM PRODUCT WHERE PRODUCT_NAME LIKE ?
    ORDER BY PRODUCT_ID ASC
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

export async function createProduct(body: any) {
  const sql = `
      INSERT INTO PRODUCT (
        "PRODUCT_ID",
        "ERP_CODE",
        "NCC_CODE",
        "COMPANY",
        "COMPANY_CODE",
        "PRODUCT_NAME",
        "PRICE",
        "FOREIGN_CURRENCY",
        "COEFFICIENT_EW"
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  const result = await window.electron.insertData(sql, [
    generateEntityId(),
    body.erpCode,
    body.nccCode,
    body.company,
    body.company.substring(0, 3),
    body.productName,
    body.price,
    body.currency,
    `${body.coefficientEW} %`,
  ]);
  return result;
}
