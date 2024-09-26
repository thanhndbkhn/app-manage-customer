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
import { ProductEdit } from './component-edit/product-edit';
import StyledTextField from 'common/StyledTextField';
import DropdownSelect from 'common/DropdownSelect/dropdown-select';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { changePercentToDecimal, convertPriceToNumber } from 'common/helper';

interface IProductListingAction {
  listProduct: any[];
  control: any;
  setValue: any;
  setListProduct: (list: any[]) => void;
  addProduct: () => void;
  onPrevStep: () => void;
  clearErrors: any;
  setError: any;
}

export const ProductListingAction = ({
  listProduct,
  setListProduct,
  control,
  setValue,
  addProduct,
  clearErrors,
  setError,
}: IProductListingAction) => {
  const onChangeProduct = (index: number, product: any) => {
    const updatedList = [...listProduct];
    updatedList[index] = { ...product, QUANTITY: 1 };
    setListProduct(updatedList);
    setValue(`products.${index}.productId`, product.PRODUCT_ID);
    clearErrors(`products.${index}.productId`);
  };

  const [typeCalculate, setTypeCalculate] = useState('mu');

  const handleSelectType = (key: string, value: string | undefined) => {
    setTypeCalculate(key);
  };

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

  const calculateTotal = (item: any) => {
    let total = 0;
    if (typeCalculate === 'mu') {
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
              <TableCell align="left">Phí VC</TableCell>
              <TableCell align="left">Phí NK</TableCell>
              <TableCell align="left">Cách tính</TableCell>
              <TableCell align="left">
                {typeCalculate === 'mu' ? 'MU' : 'Giá tiền'}
              </TableCell>
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
                            { key: 'money', value: 'Tiền' },
                          ]}
                          onSelect={(key, value) => {
                            handleSelectType(key, value);
                            setValue(`products.${index}.typeCalculate`, key);
                          }}
                          valueDefault={'MU'}
                          // error={Boolean(error)}
                          // helperText={error?.message}
                          placeHolder={'Cách tính'}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {typeCalculate === 'mu' ? (
                          <StyledTextField
                            key={index}
                            // keyData={item.QUANTITY || index}
                            onChange={(e: any) => {
                              onChangeMU(e.target.value, item.PRODUCT_ID);
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
                            name={`products.${index}.price`}
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
                                    setError(`products.${index}.price`, {
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
                                      `products.${index}.price`,
                                      formattedValue,
                                    );
                                    clearErrors(`products.${index}.price`);
                                  }
                                  // Format the number with commas and two decimal places
                                }}
                                onChange={(e: any) => {
                                  onChangePriceManual(
                                    e.target.value,
                                    item.PRODUCT_ID,
                                  );
                                  setValue(
                                    `products.${index}.price`,
                                    e.target.value,
                                  );
                                }}
                              />
                            )}
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {calculateTotal(item) &&
                          calculateTotal(item)?.toLocaleString('en-US', {
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
      </TableWrapper>
    </Box>
  );
};
