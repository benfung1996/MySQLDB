var mysql = require("mysql");
var inquirer = require("inquirer");

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
            for (var i = 0; i < cart.length; i++) {
                var query = "SELECT * FROM products WHERE ?";
                connection.query(query, { product_name: cart[i] }, function (err, res) {
                    if (err) throw err;
                    console.log(res);

                    var price = (res[0].price * answer.amount);
                    var buyAmount = JSON.parse(answer.amount);
                    var quantity = JSON.parse(res[0].stock_quantity);

                    if (res[0].stock_quantity >= answer.amount) {
                        console.log(cart[i - 1] + " is available. Please review and confirm order.");
                        console.log("Total cost of purcahse : $ " + price);
                        inquirer.prompt({
                            name: "confirm",
                            type: "confirm",
                            message: "Please review total cost and confirm order."
                        }).then (function(answer) {
                            if (answer.confirm) {
                                console.log("Thank you! Here is your receipt.")
                                console.log("------------------------------------------------------")
                                console.log("Product purchased: " + cart + "\nTotal cost: $" + price) 
                                console.log("------------------------------------------------------")
                                connection.query("UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: quantity -= buyAmount
                                    },
                                    {
                                        product_name: cart[i - 1]
                                    }
                                ]);
                                console.log(cart[i - 1] + " Remaining: " + quantity)
                                connection.end();
                            }
                            else {
                                console.log("Order canceled.")
                                amount();
                            }
                    
                        });
                    }
                    else {
                        console.log("Quantity: " + quantity);
                        console.log("Insufficient quantity!");
                        amount();
                    };
                });
            };

        });
};
