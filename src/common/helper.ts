export const convertDataCurrency = (
  listCurrency: any,
): { value: string; key: string }[] => {
  let dataConvert = [];
  if (listCurrency.length > 0) {
    dataConvert = listCurrency.map(
      (currency: { ID: string; CODE: string; EXCHANGE_RATE: string }) => {
        const number = parseFloat(currency.EXCHANGE_RATE);
        const formattedValue = number.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return {
          value: `${currency.CODE} ${formattedValue}`,
          key: currency.CODE,
        };
      },
    );
  }
  return dataConvert;
};

export const generateEntityId = () => {
  const id = new Date().getTime() * 100 + Math.floor(Math.random() * (100 + 1));
  console.log(id);
  return id;
};

export const convertDataToAutoComplete = (
  dataCustomer: any[],
  isContainDefault = true,
  templateDefault?: { value: string; key: string }[],
): { value: string; key: string }[] => {
  const dataDefault = [{ value: 'Select Client Name', key: 'clientDefault' }];
  const textDefault = templateDefault
    ? templateDefault
    : isContainDefault && dataDefault;
  const data = dataCustomer.map((customer: any) => {
    return {
      value: customer.CUSTOMER_NAME,
      key: customer.TAX_CODE,
    };
  });
  return textDefault ? textDefault.concat(data) : data;
};

export const convertDataToAutoCompleteProduct = (
  dataCustomer: any[],
  isContainDefault = true,
  templateDefault?: { value: string; key: string }[],
): { value: string; key: string }[] => {
  const data = dataCustomer.map((product: any) => {
    return {
      value: product.PRODUCT_NAME,
      key: product.PRODUCT_ID,
    };
  });
  return data;
};
