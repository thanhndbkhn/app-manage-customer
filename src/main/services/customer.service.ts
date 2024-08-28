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

export async function getListCustomer() {
  const result = await window.electron.queryDatabase(
    'SELECT * FROM CUSTOMER',
    [],
  );
  return result;
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
