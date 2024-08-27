export async function getListCurrencyBuy() {
  const result = await window.electron.queryDatabase(
    'SELECT * FROM FOREIGN_CURRENCY_BUY',
    [],
  );
  return result;
}
