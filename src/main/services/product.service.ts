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

export async function getListProduct() {
  const result = await window.electron.queryDatabase(
    'SELECT * FROM PRODUCT',
    [],
  );
  return result;
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
