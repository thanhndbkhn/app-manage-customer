import Database from 'better-sqlite3';
import path from 'path';
export interface ICustomer {
  TAX_CODE?: string;
  CUSTOMER_NAME: string;
  CLASSIFY: string;
  TYPE_BUY: string;
  ADDRESS: string;
  CITY: string;
  CREATED_AT: string;
}

export async function getListCustomer(params: {
  searchQuery: string;
  page: number;
  perPage: number;
}) {
  const offset = (params.page - 1) * params.perPage;

  const countSql = `
    SELECT COUNT(*) as totalItems FROM CUSTOMER
    WHERE CUSTOMER_NAME LIKE ?;`;

  const totalResult = await window.electron.queryDatabase(countSql, [
    `%${params.searchQuery || ''}%`,
  ]);

  const totalItems = totalResult[0].totalItems;
  const totalPages = Math.ceil(totalItems / params.perPage);
  const result = await window.electron.queryDatabase(
    `SELECT * FROM CUSTOMER WHERE CUSTOMER_NAME LIKE ?
    ORDER BY TAX_CODE ASC
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

export async function createCustomer(body: any) {
  const sql = `
      INSERT INTO CUSTOMER (
        "TAX_CODE",
        "CUSTOMER_NAME",
        "CLASSIFY",
        "TYPE_BUY",
        "ADDRESS",
        "CITY"
      )
      VALUES (?, ?, ?, ?, ?, ?);
    `;

  const result = await window.electron.insertData(sql, [
    body.taxCode,
    body.customerName,
    body.classify,
    body.typeBuy,
    body.address,
    body.city,
  ]);
  return result;
}
