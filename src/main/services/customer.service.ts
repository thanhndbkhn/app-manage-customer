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
