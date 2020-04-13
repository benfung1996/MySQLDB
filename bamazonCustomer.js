var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");

var cart = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "0117",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;

        console.log(res);
        purchase();
    });
};

function purchase() {
    inquirer.prompt({
        name: "buy",
        type: "list",
        message: "Which product would you like to purchase?",
        choices: ["Pen", "Eraser", "Paper", "Bottle Water", "Coffee", "Coke", "Banana", "Apple", "Avocado", "Sandwich", "Exit"]
    })
        .then(function (answer) {
            switch (answer.buy) {

                case "Pen":
                    cart.push("Pen");
                    amount();
                    break;

                case "Eraser":
                    cart.push("Eraser");
                    amount();
                    break;

                case "Paper":
                    cart.push("Paper");
                    amount();
                    break;

                case "Bottle Water":
                    cart.push("Bottle Water");
                    amount();
                    break;

                case "Coffee":
                    cart.push("Coffee");
                    amount();
                    break;

                case "Coke":
                    cart.push("Coke");
                    amount();
                    break;

                case "Banana":
                    cart.push("Banana");
                    amount();
                    break;

                case "Apple":
                    cart.push("Apple");
                    amount();
                    break;

                case "Avocado":
                    cart.push("Avocado");
                    amount();
                    break;

                case "Sandwich":
                    cart.push("Sandwich");
                    amount();
                    break;

                case "Exit":
                    console.log("See you next time!")
                    connection.end();
                    break;
            };
        });
};

function amount() {
    inquirer.prompt({
        name: "amount",
        type: "input",
        message: "How many would you like?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            console.log("Please enter a number.")
            return false;
        }
    })
        .then(function (answer) {
            console.log("Checking for product availability. Please wait.");

        });
};

