import {
  changePercentToDecimal,
  convertPriceToNumber,
  generateEntityId,
} from 'common/helper';

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

export async function getListBusinessDetails(businessPlanId: string) {
  // Step 1: Get the business plan general information (single record)
  const businessPlanSql = `
    SELECT
      BP.BUSINESS_PLAN_ID,
      BP.CREATED_AT,
      BP.BUSINESS_TYPE,
      BP.TAX_CODE,
      C.CUSTOMER_NAME,
      C.CLASSIFY,
      BP.END_USER,
      BP.QUOTE_NUMBER,
      BP.PROJECT,
      BP.PAYMENT_TERMS,
      BP.TECHNOLOGY_TRANSFER,
      BP.STATUS,
      BP.WARRANTY_PERIOD,
      BP.NUMBER_MAINTENANCE_TIMES,
      BP.NOTE AS BUSINESS_NOTE
    FROM BUSINESS_PLAN BP
    JOIN CUSTOMER C ON BP.TAX_CODE = C.TAX_CODE
    WHERE BP.BUSINESS_PLAN_ID = ?
    LIMIT 1;
  `;

  // Execute the query to get the business plan (single record)
  const businessPlanResult = await window.electron.queryDatabase(
    businessPlanSql,
    [BigInt(businessPlanId)],
  );

  // If no business plan is found, return null
  if (!businessPlanResult) {
    return null;
  }

  // Step 2: Get the products associated with this business plan (multiple records)
  const businessPlanDetailsSql = `
    SELECT
      BPD.BUSINESS_PLAN_DETAILS_ID,
      BPD.ERP_CODE,
      P.PRODUCT_NAME,
      P.COMPANY,
      P.PRICE AS PRODUCT_PRICE,
      BPD.QUANTITY,
      BPD.COEFFICIENT_EW,
      BPD.SHIPPING_FEES,
      BPD.IMPORT_FEES,
      BPD.TYPE_CALCULATE,
      BPD.MU,
      BPD.SELLING_PRICE,
      BPD.FOREIGN_CURRENCY_SELL,
      BPD.NOTE AS DETAILS_NOTE
    FROM BUSINESS_PLAN_DETAILS BPD
    LEFT JOIN PRODUCT P ON BPD.ERP_CODE = P.ERP_CODE
    WHERE BPD.BUSINESS_PLAN_ID = ?
    ORDER BY BPD.BUSINESS_PLAN_DETAILS_ID ASC;
  `;

  // Execute the query to get product details associated with this business plan
  const productDetailsResult = await window.electron.queryDatabase(
    businessPlanDetailsSql,
    [BigInt(businessPlanId)],
  );

  // Map the product details to an array of products
  const products = productDetailsResult.map((detail) => ({
    businessPlanDetailsId: detail.BUSINESS_PLAN_DETAILS_ID,
    erpCode: detail.ERP_CODE,
    productName: detail.PRODUCT_NAME,
    company: detail.COMPANY,
    productPrice: detail.PRODUCT_PRICE,
    quantity: detail.QUANTITY,
    coefficientEW: detail.COEFFICIENT_EW,
    shippingFees: detail.SHIPPING_FEES,
    importFees: detail.IMPORT_FEES,
    typeCalculate: detail.TYPE_CALCULATE,
    mu: detail.MU,
    sellingPrice: detail.SELLING_PRICE,
    foreignCurrencySell: detail.FOREIGN_CURRENCY_SELL,
    detailsNote: detail.DETAILS_NOTE,
    total: calculateTotal(detail),
  }));

  console.log({
    businessPlanResult: businessPlanResult[0], // Directly spread the single business plan result
    products, // Attach the list of products
  });
  // Return the business plan and its associated products
  return {
    businessPlanResult: businessPlanResult[0], // Directly spread the single business plan result
    products, // Attach the list of products
  };
}

const calculateTotal = (product: any) => {
  let total = 0;
  if (product.TYPE_CALCULATE === 'mu') {
    total =
      Number(product.QUANTITY) *
      (((convertPriceToNumber(product.PRODUCT_PRICE) *
        changePercentToDecimal(product.COEFFICIENT_EW) *
        (1 + parseFloat(product.IMPORT_FEES)) +
        parseFloat(product.SHIPPING_FEES)) /
        (100 - (product.MU || 1))) *
        100);
  } else {
    total =
      (Number(product.QUANTITY) || 1) *
      (convertPriceToNumber(product.SELLING_PRICE) || 0);
  }
  return total;
};

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
