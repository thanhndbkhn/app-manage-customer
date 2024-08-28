/** @format */

import { IconButton, Card } from '@mui/material';
import { DownArrow } from 'assets';
import useOutsideClick from 'hooks/useOutsideClick';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

interface IDropdownSelect {
  listData: { key: string; value: string }[];
  valueDefault: string;
  onSelect: (key: string, value?: string, id?: number) => void;
  styleCustom?: any;
  index?: number;
  error?: boolean;
  helperText?: string;
  placeHolder?: string;
}
const DropdownSelect = (props: IDropdownSelect) => {
  const [displaySelect, setDisplaySelect] = useState(false);
  const cardRef = useRef(null);
  useOutsideClick(cardRef, () => {
    setDisplaySelect(false);
  });
  const [value, setValue] = useState('');

  useEffect(() => {
    setDisplaySelect(false);
  }, [props.listData]);

  useEffect(() => {
    if (props.valueDefault) {
      setValue(props.valueDefault);
    }
  }, [props.valueDefault]);
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FAFDFF',
          boxShadow: 'rgba(0, 0, 0, 0.17) 0px 2.56px 2.05px',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          border: `${props.error ? '1px solid #d32f2f' : ''}`,
        }}
      >
        {value ? (
          <p
            style={{
              ...(props.styleCustom && {
                maxWidth: props.styleCustom.maxWidth,
              }),
              width: '100%',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              margin: 0,
              overflow: 'hidden',
            }}
          >
            {value}
          </p>
        ) : (
          <p
            style={{
              ...(props.styleCustom && {
                maxWidth: props.styleCustom.maxWidth,
              }),
              width: '100%',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              margin: 0,
              overflow: 'hidden',
              color: '#848689',
            }}
          >
            {props.placeHolder}
          </p>
        )}

        <IconButton
          onClick={() => {
            setDisplaySelect(true);
          }}
        >
          <DownArrow />
        </IconButton>
      </div>

      {props.error && props.helperText && (
        <p
          style={{
            margin: '0',
            marginTop: '5px',
            paddingLeft: '10px',
            fontSize: '13px',
            color: '#d32f2f',
          }}
        >
          {props.helperText}
        </p>
      )}

      {displaySelect && props.listData.length > 0 && (
        <Card
          ref={cardRef}
          style={{
            ...props.styleCustom,
            width: '100%',
            position: 'absolute',
            top: '40px',
            zIndex: '10',
            padding: '10px',
            background: '#FAFDFF',
            boxShadow:
              '0px 3.9px 3.12px 0px rgba(41, 52, 149, 0.06), 0px 9.37px 7.49px 0px rgba(41, 52, 149, 0.08), 0px 17.634px 14.114px 0px rgba(41, 52, 149, 0.10), 0px 31.46px 25.174px 0px rgba(41, 52, 149, 0.13), 0px 58.84px 47.074px 0px rgba(41, 52, 149, 0.15), 0px 140.83px 112.66px 0px rgba(41, 52, 149, 0.21)',
            borderRadius: 15,
            ...props.styleCustom,
          }}
        >
          {props.listData.map(
            (data: { key: string; value: string }, index: number) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    setValue(data.value);
                    props.onSelect(data.key, data.value, props.index);
                    setDisplaySelect(false);
                  }}
                  style={{
                    margin: 0,
                    wordWrap: 'break-word',
                    padding: '10px 5px',
                    lineHeight: '16px',
                    cursor: 'pointer',
                  }}
                >
                  {data.value}
                </p>
              );
            },
          )}
        </Card>
      )}
    </div>
  );
};

export default DropdownSelect;
