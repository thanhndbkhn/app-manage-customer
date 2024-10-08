import {
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { AddItem } from 'assets';
import { TableWrapper, StyledTable, StyledTableHead } from 'style/styles';
import { ProductEdit } from './product-edit';
import StyledTextField from 'common/StyledTextField';
import DropdownSelect from 'common/DropdownSelect/dropdown-select';
import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { changePercentToDecimal, convertPriceToNumber } from 'common/helper';
import StyledTextArea from 'common/StyledTextArea';

interface IProductListingAction {
  listProduct: any[];
  control: any;
  setValue: any;
  getValue: any;
  setListProduct: (list: any[]) => void;
  addProduct: () => void;
  onPrevStep: () => void;
  clearErrors: any;
  setError: any;
  watch: any;
}

export const ProductListingAction = ({
  listProduct,
  setListProduct,
  control,
  setValue,
  getValue,
  addProduct,
  clearErrors,
  watch,
  setError,
}: IProductListingAction) => {
  const onChangeProduct = (index: number, product: any) => {
    const updatedList = [...listProduct];
    updatedList[index] = { ...product, QUANTITY: 1 };
    setListProduct(updatedList);
    setValue(`products.${index}.productId`, product.PRODUCT_ID);
    setValue(`products.${index}.erpCode`, product.ERP_CODE);
    setValue(`products.${index}.coefficientEw`, product.COEFFICIENT_EW);
    setValue(`products.${index}.foreignCurrencySell`, product.FOREIGN_CURRENCY);
    setValue(`products.${index}.price`, product.PRICE);
    clearErrors(`products.${index}.productId`);
  };

  // const [typeCalculate, setTypeCalculate] = useState('mu');

  // const handleSelectType = (key: string, value: string | undefined) => {
  //   setTypeCalculate(key);
  // };

  const onChangeShippingFees = (value: string, key: string) => {
    const fIndex = listProduct?.findIndex(
      (valueChange) => valueChange.PRODUCT_ID === key,
    );
    if (fIndex >= 0) {
      const valueUpdate = listProduct?.map((valueData) => {
        if (valueData.PRODUCT_ID === key) {
          return { ...valueData, shippingFees: parseFloat(value) };
        }
        return valueData;
      });
      setListProduct(valueUpdate);
    }
  };

  const onChangeImportFees = (value: string, key: string) => {
    const fIndex = listProduct?.findIndex(
      (valueChange) => valueChange.PRODUCT_ID === key,
    );
    if (fIndex >= 0) {
      const valueUpdate = listProduct?.map((valueData) => {
        if (valueData.PRODUCT_ID === key) {
          return { ...valueData, importFees: parseFloat(value) };
        }
        return valueData;
      });
      setListProduct(valueUpdate);
    }
  };

  const onChangeQuantity = (value: number, key: string) => {
    const fIndex = listProduct?.findIndex(
      (valueChange) => valueChange.PRODUCT_ID === key,
    );
    if (fIndex >= 0) {
      const valueUpdate = listProduct?.map((valueData) => {
        if (valueData.PRODUCT_ID === key) {
          return { ...valueData, QUANTITY: Number(value) };
        }
        return valueData;
      });
      setListProduct(valueUpdate);
    }
  };

  const onChangePriceManual = (value: number, key: string) => {
    const fIndex = listProduct?.findIndex(
      (valueChange) => valueChange.PRODUCT_ID === key,
    );
    if (fIndex >= 0) {
      const valueUpdate = listProduct?.map((valueData) => {
        if (valueData.PRODUCT_ID === key) {
          return { ...valueData, PRICE_MANUAL: Number(value) };
        }
        return valueData;
      });
      setListProduct(valueUpdate);
    }
  };

  const onChangeMU = (value: number, key: string) => {
    const fIndex = listProduct?.findIndex(
      (valueChange) => valueChange.PRODUCT_ID === key,
    );
    if (fIndex >= 0) {
      const valueUpdate = listProduct?.map((valueData) => {
        if (valueData.PRODUCT_ID === key) {
          return { ...valueData, MU: Number(value) };
        }
        return valueData;
      });
      setListProduct(valueUpdate);
    }
  };

  const calculateTotal = (item: any, index: number) => {
    let total = 0;
    if (getValue(`products.${index}.typeCalculate`) === 'mu') {
      total =
        item.QUANTITY *
        (((convertPriceToNumber(item.PRICE) *
          changePercentToDecimal(item.COEFFICIENT_EW) *
          (1 + item.importFees) +
          item.shippingFees) /
          (100 - (item.MU || 1))) *
          100);
    } else {
      total = (item.QUANTITY || 1) * (item.PRICE_MANUAL || 0);
    }
    return total;
  };
  const watchFields = watch();

  const calculateTotalAll = () => {
    const products = getValue(`products`);
    let total = 0;
    products.map((item: any) => {
      if (item.productId) {
        if (item.typeCalculate === 'mu') {
          total +=
            Number(item.quantity) *
            (((convertPriceToNumber(item.price) *
              changePercentToDecimal(item.coefficientEw) *
              (1 + parseFloat(item.importFees)) +
              parseFloat(item.shippingFees)) /
              (100 - (item.mu || 1))) *
              100);
        } else {
          total +=
            item.quantity * convertPriceToNumber(item.sellingPrice || '0');
        }
      }
    });
    return total;
  };

  return (
    <Box>
      <TableWrapper
        style={{
          marginTop: '15px',
        }}
      >
        <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell align="left">Tên sản phẩm</TableCell>
              <TableCell align="left">Số lượng</TableCell>
              <TableCell align="left">Giá</TableCell>
              <TableCell align="left">Ngoại tệ</TableCell>
              <TableCell align="left">Hệ số EW</TableCell>
              <TableCell align="left">Phí vận chuyển(USD)</TableCell>
              <TableCell align="left">Phí nhập khẩu (%)</TableCell>
              <TableCell align="left">Cách tính</TableCell>
              <TableCell align="left">Giá trị</TableCell>
              <TableCell align="left">Ghi chú</TableCell>
              <TableCell align="left">Tổng</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {listProduct.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell align="left" style={{ position: 'relative' }}>
                    <ProductEdit
                      control={control}
                      index={index}
                      key={item.PRODUCT_ID || index}
                      keyData={item.PRODUCT_ID || index}
                      onChange={onChangeProduct}
                      valueDefault={item.PRODUCT_NAME}
                    />
                  </TableCell>
                  {item.PRODUCT_ID && (
                    <>
                      <TableCell align="left">
                        <StyledTextField
                          key={item.QUANTITY || index}
                          // keyData={item.QUANTITY || index}
                          onChange={(e: any) => {
                            onChangeQuantity(e.target.value, item.PRODUCT_ID);
                            setValue(
                              `products.${index}.quantity`,
                              e.target.value,
                            );
                          }}
                          type="number"
                          style={{ width: '60px' }}
                          autoComplete="off"
                          placeholder={'Weight'}
                          value={item?.QUANTITY || 0}
                        />
                      </TableCell>
                      <TableCell align="left">{item.PRICE}</TableCell>
                      <TableCell align="left">
                        {item.FOREIGN_CURRENCY}
                      </TableCell>
                      <TableCell align="left">{item.COEFFICIENT_EW}</TableCell>
                      <TableCell align="left">
                        <Controller
                          control={control}
                          name={`products.${index}.shippingFees`}
                          render={({ field, fieldState: { error } }) => (
                            <StyledTextField
                              {...field}
                              key={item.SHIPPING_FEES || index}
                              // keyData={item.QUANTITY || index}
                              type="text"
                              style={{ width: '80px' }}
                              error={Boolean(error)}
                              helperText={error?.message}
                              autoComplete="off"
                              placeholder={'Phí vc'}
                              onBlur={(e) => {
                                const rawValue = e.target.value.replace(
                                  /,/g,
                                  '',
                                );
                                const number = parseFloat(rawValue);
                                if (isNaN(number)) {
                                  setError(`products.${index}.shippingFees`, {
                                    message: 'Not number',
                                  });
                                } else {
                                  const formattedValue = number.toLocaleString(
                                    'en-US',
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    },
                                  );

                                  // Update the field value with the formatted number
                                  setValue(
                                    `products.${index}.shippingFees`,
                                    formattedValue,
                                  );
                                  clearErrors(`products.${index}.shippingFees`);
                                }
                                // Format the number with commas and two decimal places
                              }}
                              onChange={(e: any) => {
                                onChangeShippingFees(
                                  e.target.value,
                                  item.PRODUCT_ID,
                                );
                                setValue(
                                  `products.${index}.shippingFees`,
                                  e.target.value,
                                );
                              }}
                              // value={item?.SHIPPING_FEES || 0}
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {' '}
                        <Controller
                          control={control}
                          name={`products.${index}.importFees`}
                          render={({ field, fieldState: { error } }) => (
                            <StyledTextField
                              {...field}
                              key={item.IMPORT_FEES || index}
                              error={Boolean(error)}
                              helperText={error?.message}
                              type="text"
                              style={{ width: '80px' }}
                              autoComplete="off"
                              placeholder={'Phí NK'}
                              onBlur={(e) => {
                                const rawValue = e.target.value.replace(
                                  /,/g,
                                  '',
                                );
                                const number = parseFloat(rawValue);
                                if (isNaN(number)) {
                                  setError(`products.${index}.importFees`, {
                                    message: 'Not number',
                                  });
                                } else {
                                  const formattedValue = number.toLocaleString(
                                    'en-US',
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    },
                                  );

                                  // Update the field value with the formatted number
                                  setValue(
                                    `products.${index}.importFees`,
                                    formattedValue,
                                  );
                                  clearErrors(`products.${index}.importFees`);
                                }
                                // Format the number with commas and two decimal places
                              }}
                              onChange={(e: any) => {
                                onChangeImportFees(
                                  e.target.value,
                                  item.PRODUCT_ID,
                                );
                                setValue(
                                  `products.${index}.importFees`,
                                  e.target.value,
                                );
                              }}
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell align="left" style={{ maxWidth: '130px' }}>
                        {' '}
                        <DropdownSelect
                          styleCustom={{ maxWidth: '80px', minWidth: '80px' }}
                          listData={[
                            { key: 'mu', value: 'MU' },
                            { key: 'money', value: 'Giá bán' },
                          ]}
                          onSelect={(key, value) => {
                            // handleSelectType(key, value);
                            clearErrors(`products.${index}.importFees`);
                            clearErrors(`products.${index}.shippingFees`);
                            setValue(`products.${index}.typeCalculate`, key);
                          }}
                          valueDefault={'MU'}
                          // error={Boolean(error)}
                          // helperText={error?.message}
                          placeHolder={'Cách tính'}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {getValue(`products.${index}.typeCalculate`) ===
                        'mu' ? (
                          <StyledTextField
                            key={index}
                            // keyData={item.QUANTITY || index}
                            onChange={(e: any) => {
                              onChangeMU(e.target.value, item.PRODUCT_ID);
                              setValue(`products.${index}.mu`, e.target.value);
                            }}
                            type="number"
                            style={{ width: '60px' }}
                            autoComplete="off"
                            placeholder={'MU'}
                            value={item?.MU || 1}
                          />
                        ) : (
                          <Controller
                            control={control}
                            name={`products.${index}.sellingPrice`}
                            render={({ field, fieldState: { error } }) => (
                              <StyledTextField
                                {...field}
                                key={index}
                                error={Boolean(error)}
                                helperText={error?.message}
                                type="text"
                                style={{ width: '150px' }}
                                autoComplete="off"
                                placeholder={'Giá'}
                                onBlur={(e) => {
                                  const rawValue = e.target.value.replace(
                                    /,/g,
                                    '',
                                  );
                                  const number = parseFloat(rawValue);
                                  if (isNaN(number)) {
                                    setError(`products.${index}.sellingPrice`, {
                                      message: 'Not number',
                                    });
                                  } else {
                                    const formattedValue =
                                      number.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      });

                                    // Update the field value with the formatted number
                                    setValue(
                                      `products.${index}.sellingPrice`,
                                      formattedValue,
                                    );
                                    clearErrors(
                                      `products.${index}.sellingPrice`,
                                    );
                                  }
                                  // Format the number with commas and two decimal places
                                }}
                                onChange={(e: any) => {
                                  onChangePriceManual(
                                    e.target.value,
                                    item.PRODUCT_ID,
                                  );
                                  setValue(
                                    `products.${index}.sellingPrice`,
                                    e.target.value,
                                  );
                                }}
                              />
                            )}
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <Controller
                          control={control}
                          name={`products.${index}.note`}
                          render={({ field, fieldState: { error } }) => (
                            <StyledTextField
                              {...field}
                              key={item.NOTE || index}
                              // keyData={item.QUANTITY || index}
                              type="text"
                              style={{ width: '80px' }}
                              error={Boolean(error)}
                              helperText={error?.message}
                              autoComplete="off"
                              placeholder={'Ghi chú'}
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {calculateTotal(item, index) &&
                          calculateTotal(item, index)?.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
          <AddItem style={{ cursor: 'pointer' }} onClick={() => addProduct()} />
        </StyledTable>
        <Box style={{ display: 'flex', justifyContent: 'end' }}>
          <>
            Tổng tiền:{' '}
            {calculateTotalAll().toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </>
        </Box>
      </TableWrapper>
    </Box>
  );
};
