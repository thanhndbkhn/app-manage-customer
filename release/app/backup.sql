PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "todos" (
	"id"	INTEGER,
	"title"	TEXT,
	"date"	TEXT,
	"status"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO todos VALUES(1,'My first taskd','2023-07-07T22:19:00.172Z',1);
INSERT INTO todos VALUES(2,'My second task','2023-07-07T22:19:00.175Z',1);
INSERT INTO todos VALUES(5,'testing task 2','2023-07-08T14:25:40.891Z',0);
INSERT INTO todos VALUES(6,'testing task 3','2023-07-08T14:25:40.891Z',1);
INSERT INTO todos VALUES(19,'creating a teste','09/07/2023, 12:19:15',0);
CREATE TABLE CUSTOMER(
TAX_CODE PRIMARY KEY NOT NULL,
CUSTOMER_NAME,
CLASSIFY,
TYPE_BUY,
ADDRESS,
CITY,
CREATED_AT DATE DEFAULT (DATE('now')));
INSERT INTO CUSTOMER VALUES('100114025','CÔNG TY SGS VIỆT NAM TRÁCH NHIỆM HỮU HẠN','Industry','Direct','','','');
INSERT INTO CUSTOMER VALUES('100839134','TRUNG TÂM NHIỆT ĐỚI VIỆT NGA','','','','','');
INSERT INTO CUSTOMER VALUES('105426966','CÔNG TY CỔ PHẦN VISTECH','','','','Hà Nội','');
INSERT INTO CUSTOMER VALUES('107692610','CÔNG TY CỔ PHẦN KHOA HỌC VÀ CÔNG NGHỆ GREENLAB VIỆT NAM','','','','Hà Nội','');
INSERT INTO CUSTOMER VALUES('201311397','CÔNG TY TNHH LG ELECTRONICS VIỆT NAM HẢI PHÒNG','Industry','Direct','Lô CN2, khu công nghiệp Tràng Duệ, Xã Lê Lợi, Huyện An Dương, Thành phố Hải Phòng, Việt Nam','','');
INSERT INTO CUSTOMER VALUES('301129367','TỔNG CÔNG TY CẤP NƯỚC SÀI GÒN - TRÁCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN','','','','Thành phố Hồ Chí Minh','');
INSERT INTO CUSTOMER VALUES('312138469','CÔNG TY TNHH THIẾT BỊ KHOA HỌC KỸ THUẬT THIÊN GIA PHÁT','Trading','','','','');
INSERT INTO CUSTOMER VALUES('2300272632','CÔNG TY TNHH MPT SOLUTION (VIỆT NAM)','Industry','','','','');
INSERT INTO CUSTOMER VALUES('3301601070','CÔNG TY TNHH MỘT THÀNH VIÊN ĐẦU TƯ VÀ CHẾ BIẾN KHOÁNG SẢN PHENIKAA HUẾ','Industry','Direct','Lô CN15 Khu B, Khu công nghiệp Phong Điền, Xã Phong Hòa, Huyện Phong Điền, Tỉnh Thừa Thiên Huế, Việt Nam','Tỉnh Thừa Thiên Huế','');
INSERT INTO CUSTOMER VALUES('3500696503','CÔNG TY TNHH CÔNG NGHIỆP KÍNH NSG VIỆT NAM','Industry','Direct','Khu công nghiệp Mỹ Xuân A, Phường Mỹ Xuân, Thị Xã Phú Mỹ, Bà Rịa - Vũng Tàu','Bà Rịa - Vũng Tàu','');
INSERT INTO CUSTOMER VALUES('3501382588','CÔNG TY CỔ PHẦN CHINA STEEL & NIPPON STEEL VIỆT NAM','Industry','Direct','Khu công nghiệp Mỹ Xuân A2, Phường Mỹ Xuân, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu, Việt Nam','Bà Rịa - Vũng Tàu','');
INSERT INTO CUSTOMER VALUES('4300793861','CÔNG TY CỔ PHẦN THÉP HÒA PHÁT DUNG QUẤT','Industry','Direct','','Quảng Ngãi','');
INSERT INTO CUSTOMER VALUES('4600400511','TRƯỜNG ĐẠI HỌC NÔNG LÂM','','','','Thái Nguyên','');
CREATE TABLE BUSINESS_PLAN (
  BUSINESS_PLAN_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  CREATED_AT DATE DEFAULT (DATE('now')),
  BUSINESS_TYPE,
  TAX_CODE,
  END_USER,
  QUOTE_NUMBER,
  PROJECT,
  PAYMENT_TERMS,
  TECHNOLOGY_TRANSFER,
  STATUS,
  WARRANTY_PERIOD,
  NUMBER_MAINTENANCE_TIMES INTERGER,
  NOTE TEXT,
  FOREIGN KEY (TAX_CODE) REFERENCES CUSTOMER(TAX_CODE)
);
INSERT INTO BUSINESS_PLAN VALUES(1,'31-Jul-24','Trước thầu','3500696503','NSG VIỆT NAM','','ZSX Primus IV hệ 3kW','','3.00%','Intent our solution 70%','','','');
INSERT INTO BUSINESS_PLAN VALUES(2,'31-Jul-24','Trước thầu','0312138469','4100666915','','','','2.00%','Interest 30%','','','');
INSERT INTO BUSINESS_PLAN VALUES(3,'01-Aug-24','Trước thầu','0100114025','SGS VIỆT NAM','HLH106.30724','','30:70','3.00%','Interest 30%','','','Test');
INSERT INTO BUSINESS_PLAN VALUES(4,'15-Jul-24','Trước thầu','4300793861','HÒA PHÁT DUNG QUẤT','HLH057.290724','','10-60-25-5','3.00%','Intent our solution 70%','12 tháng',0,'');
INSERT INTO BUSINESS_PLAN VALUES(6,'05-Aug-24','Trước thầu','3501382588','','HLH150.05082024','','Chuyển khoản 30-60-10','0.00%','Consideration 50%','12 tháng',0,'');
INSERT INTO BUSINESS_PLAN VALUES(7,'','','0100839134','','','','','0.00%','','','','');
INSERT INTO BUSINESS_PLAN VALUES(8,'09-Aug-24','Trước thầu','3500696503','NSG VIỆT NAM','','','','3.00%','','','','');
INSERT INTO BUSINESS_PLAN VALUES(10,'13-Aug-24','Trước thầu','3301601070','Phenikaa Huế','','','','4.00%','Consideration 50%','12 tháng',0,'');
INSERT INTO BUSINESS_PLAN VALUES(11,'19-Aug-24','','0201311397','lg','','','','0.00%','New 10%','12 Tháng',0,'');
CREATE TABLE BUSINESS_PLAN_DETAILS (
  BUSINESS_PLAN_DETAILS_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  BUSINESS_PLAN_ID INTEGER,
  ERP_CODE,
  QUANTITY,
  COEFFICIENT_EW,
  SHIPPING_FEES,
  IMPORT_FEES,
  TYPE_CALCULATE,
  MU,
  SELLING_PRICE,
  FOREIGN_CURRENCY_SELL,
  NOTE TEXT,
  FOREIGN KEY (BUSINESS_PLAN_ID) REFERENCES BUSINESS_PLAN(BUSINESS_PLAN_ID),
  FOREIGN KEY (ERP_CODE) REFERENCES PRODUCT(ERP_CODE), FOREIGN KEY (FOREIGN_CURRENCY_SELL) REFERENCES FOREIGN_CURRENCY_SELL(CODE)
);

CREATE TABLE IF NOT EXISTS "FOREIGN_CURRENCY_SELL" (
	"ID"	INTEGER NOT NULL,
	"CODE"	TEXT,
	"EXCHANGE_RATE"	NUMERIC,
	"TYPE"	INTEGER,
	PRIMARY KEY("CODE")
);
INSERT INTO FOREIGN_CURRENCY_SELL VALUES(2,'JPY',175,NULL);
INSERT INTO FOREIGN_CURRENCY_SELL VALUES(3,'VND',1,NULL);
INSERT INTO FOREIGN_CURRENCY_SELL VALUES(4,'USD',26000,NULL);
INSERT INTO FOREIGN_CURRENCY_SELL VALUES(5,'CHF',28000,NULL);
CREATE TABLE IF NOT EXISTS "FOREIGN_CURRENCY_BUY" (
	"ID"	INTEGER NOT NULL,
	"CODE"	TEXT,
	"TYPE"	INTEGER,
	"EXCHANGE_RATE"	NUMERIC,
	PRIMARY KEY("CODE")
);
INSERT INTO FOREIGN_CURRENCY_BUY VALUES(1,'JPY',NULL,180);
INSERT INTO FOREIGN_CURRENCY_BUY VALUES(2,'VND','',1);
INSERT INTO FOREIGN_CURRENCY_BUY VALUES(3,'USD','',26000);
INSERT INTO FOREIGN_CURRENCY_BUY VALUES(4,'CHF','',28000);
CREATE TABLE IF NOT EXISTS "PRODUCT" (
	"PRODUCT_ID"	INTEGER NOT NULL UNIQUE,
	"ERP_CODE"	TEXT NOT NULL UNIQUE,
	"NCC_CODE"	TEXT,
	"COMPANY"	TEXT,
	"COMPANY_CODE"	TEXT,
	"PRODUCT_NAME"	TEXT NOT NULL,
	"PRICE"	NUMERIC NOT NULL,
	"FOREIGN_CURRENCY"	TEXT,
	"COEFFICIENT_EW"	TEXT,
	FOREIGN KEY("FOREIGN_CURRENCY") REFERENCES "FOREIGN_CURRENCY_BUY"("CODE"),
	PRIMARY KEY("ERP_CODE")
);

DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('todos',19);
INSERT INTO sqlite_sequence VALUES('BUSINESS_PLAN',11);
INSERT INTO sqlite_sequence VALUES('BUSINESS_PLAN_DETAILS',121);
COMMIT; -- due to errors
