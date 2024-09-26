import { convertPriceToNumber, generateEntityId } from 'common/helper';

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

export async function createBusiness(body: any) {
  const sql = `
      INSERT INTO BUSINESS_PLAN (
        "BUSINESS_PLAN_ID",
        "BUSINESS_TYPE",
        "TAX_CODE",
        "END_USER",
        "QUOTE_NUMBER",
        "PROJECT",
        "PAYMENT_TERMS",
        "TECHNOLOGY_TRANSFER",
        "STATUS",
        "WARRANTY_PERIOD",
        "NUMBER_MAINTENANCE_TIMES",
        "NOTE"
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  const result = await window.electron.insertData(sql, [
    generateEntityId(),
    'Trước thầu',
    body.taxCode,
    body.customerName,
    body.quoteNumber,
    body.project,
    body.paymentTerms,
    body.technologyTransfer,
    body.status,
    body.warrantyPeriod,
    body.numberMaintenanceTimes,
    body.note,
  ]);
  return result;
}

export async function createBusinessDetails(bodies: any[]) {
  const sql = `
      INSERT INTO BUSINESS_PLAN_DETAILS (
        "BUSINESS_PLAN_DETAILS_ID",
        "BUSINESS_PLAN_ID",
        "ERP_CODE",
        "QUANTITY",
        "COEFFICIENT_EW",
        "SHIPPING_FEES",
        "IMPORT_FEES",
        "TYPE_CALCULATE",
        "MU",
        "SELLING_PRICE",
        "FOREIGN_CURRENCY_SELL",
        "NOTE"
    ) VALUES ${bodies
      .map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)') // Ensure proper placeholders for each row
      .join(', ')};
  `;

  const values = bodies.flatMap((body) => [
    generateEntityId(),
    body.businessPlanId,
    body.erpCode,
    body.quantity,
    body.coefficientEw,
    body.shippingFees,
    body.importFees,
    body.typeCalculate,
    body.typeCalculate === 'mu' ? body.mu || 1 : 0,
    body.typeCalculate === 'mu' ? body.price : body.sellingPrice,
    body.foreignCurrencySell,
    body.note,
  ]);

  console.log(values);

  const result = await window.electron.insertData(sql, values);
  return result;
}
