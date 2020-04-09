DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0 NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pen", "Learning Tool", 0.5, 100),("Eraser", "Learning Tool", 1.25, 50),("Paper", "Learning Tool", 3.25, 500),
("Bottle Water", "Drinks", 1, 30),("Coffee", "Drinks", 3.25, 30),("Coke", "Drinks", 1, 30),
("Banana", "Fruits", 0.75, 40),("Apple", "Fruits", 1, 25),("Avocado", "Fruits", 1.25, 20),
("Sandwich", "Food", 5.50, 25);

SELECT * FROM products;