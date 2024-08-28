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
