DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(80) NOT NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Rubiks Cube", "Puzzles", "8.99", "1000" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Rubiks Cube 4x4", "Puzzles", "17.99", "1000" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Rubiks Cube 2x2", "Puzzles", "4.59", "1000" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Celestron - PowerSeeker 70EQ Refractor Telescope - Black", "Outdoors", "114.99", "50" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "350X Magnification 700x70mm Telescope", "Outdoors", "189.99", "40" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Celestron - CPC 1100 GPS Schmidt-Cassegrain Computerized Telescope - Black", "Outdoors", "2999.99", "10" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Insignia™ - 2-Way Indoor/Outdoor Speakers (Pair) - Black", "Audio/Video", "39.99", "500" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Marshall Stockwell Portable Bluetooth Speaker with Flip Cover Case - Black", "Audio/Video", "199.99", "100" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "JBL EON610", "Audio/Video", "399.99", "50" );

SELECT * FROM products;
