export interface IProduct {
  TAX_CODE?: string;
  CUSTOMER_NAME: string;
  CLASSIFY: string;
  TYPE_BUY: string;
  ADDRESS: string;
  CITY: string;
  CREATED_AT: string;
}

export async function getListProduct() {
  const result = await window.electron.queryDatabase(
    'SELECT * FROM PRODUCT',
    [],
  );
  return result;
}
