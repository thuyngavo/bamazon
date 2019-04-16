-- create a database --
CREATE DATABASE bamazon;
USE bamazon;

-- create a table --
CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(100,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("item 1", "Cosmetic", 5.75, 500),
		("item 2", "Cosmetic", 6.25, 500),
		("item 3", "Sport", 25.99, 400),
		("item 4", "Sport", 15.25, 400),
		("item 5", "Clothing", 20.00, 300),
		("item 6", "Clothing", 50.00, 300),
		("item 7", "Outdoors", 89.99, 200),
		("item 8", "Outdoors", 199.59, 200),
		("item 9", "Home", 35.49, 100),
		("item 10", "Home", 159.39, 100);

