import { IconButton, Card, InputAdornment } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { DownArrow, SearchFilter } from 'assets';
import StyledTextField from 'common/StyledTextField';
import useOutsideClick from 'hooks/useOutsideClick';

interface IDropdownSelect {
  listData: { key: string; value: string }[];
  valueDefault: string;
  handleSearch: (value: string) => void;
  onSelect: (key: string, value?: string) => void;
  styleCustom?: any;
  error?: boolean;
  helperText?: string;
  placeHolder?: string;
}

const AutoComplete = (props: IDropdownSelect) => {
  const [displaySelect, setDisplaySelect] = useState(false);
  const [isChangeText, setChangeText] = useState(false);
  const [dataListChange, setDataListChange] = useState<any>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardTop, setCardTop] = useState('40px');

  useOutsideClick(cardRef, () => {
    setDisplaySelect(false);
    setChangeText(false);
  });

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.valueDefault);
  }, [props.valueDefault]);

  useEffect(() => {
    setDataListChange(props.listData);
  }, [props.listData]);

  useEffect(() => {
    if (displaySelect && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Adjust card position if it goes beyond the window's height
      if (rect.bottom > windowHeight) {
        setCardTop(`-200px`); // Ensures it remains inside the window
      } else {
        setCardTop('40px'); // Default position if no overflow
        //  setCardTop(`${windowHeight - rect.height }px`);
      }
    }
  }, [displaySelect]);

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FAFDFF',
          boxShadow: 'rgb(0 0 0 / 17%) 0px 2.56px 2.05px',
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
              ...props.styleCustom,
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
              ...props.styleCustom,
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

      {displaySelect && (
        <Card
          ref={cardRef}
          style={{
            position: 'absolute',
            top: cardTop,
            zIndex: '10',
            padding: '10px',
            background: '#FAFDFF',
            boxShadow:
              '0px 3.9px 3.12px 0px rgba(41, 52, 149, 0.06), 0px 9.37px 7.49px 0px rgba(41, 52, 149, 0.08), 0px 17.634px 14.114px 0px rgba(41, 52, 149, 0.10), 0px 31.46px 25.174px 0px rgba(41, 52, 149, 0.13), 0px 58.84px 47.074px 0px rgba(41, 52, 149, 0.15), 0px 140.83px 112.66px 0px rgba(41, 52, 149, 0.21)',
            borderRadius: 15,
          }}
        >
          <StyledTextField
            type={'text'}
            id="aa"
            autoComplete="off"
            placeholder="Type of search"
            onChange={(e) => {
              props.handleSearch(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => {}}>
                    <SearchFilter />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={false}
          />
          {dataListChange.map(
            (data: { key: string; value: string }, index: number) => {
              return (
                <p
                  key={data.key}
                  onClick={() => {
                    setValue(data.value);
                    props.onSelect(data.key, data.value);
                    setDisplaySelect(false);
                  }}
                  style={{
                    margin: 0,
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

export default AutoComplete;
