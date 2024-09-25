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

interface IProductListingAction {
  listProduct: any[];
  control: any;
  setValue: any;
  setListProduct: (list: any[]) => void;
  addProduct: () => void;
  onPrevStep: () => void;
}

export const ProductListingAction = ({
  listProduct,
  setListProduct,
  control,
  setValue,
  addProduct,
}: IProductListingAction) => {
  const onChangeProduct = (index: number, product: any) => {
    const updatedList = [...listProduct];
    updatedList[index] = { ...product, QUANTITY: 1 };
    setListProduct(updatedList);
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

  return (
    <Box>
      <TableWrapper
        style={{
          // overflowY: 'auto',
          // maxHeight: '300px',
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
                {' '}
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
                          style={{ width: '80px' }}
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
                      <TableCell align="left">
                        {' '}
                        <DropdownSelect
                          styleCustom={{ maxWidth: '222px', minWidth: '250px' }}
                          listData={[
                            { key: 'mu', value: 'MU' },
                            { key: 'money', value: 'Tiền' },
                          ]}
                          onSelect={handleSelectType}
                          valueDefault={'MU'}
                          // error={Boolean(error)}
                          // helperText={error?.message}
                          placeHolder={'Cách tính'}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {typeCalculate === 'mu' ? (
                          'MU'
                        ) : (
                          <StyledTextField
                            key={item.IMPORT_FEES || index}
                            // keyData={item.QUANTITY || index}
                            type="text"
                            style={{ width: '80px' }}
                            autoComplete="off"
                            placeholder={'Phí NK'}
                            value={item?.IMPORT_FEES || 0}
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">Tổng</TableCell>
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
