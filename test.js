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
        type: "checkbox",
        message: "Which product would you like to purchase?",
        choices: ["Pen", "Eraser", "Paper", "Bottle Water", "Coffee", "Coke", "Banana", "Apple", "Avocado", "Sandwich", "Exit"]
    })
        .then(function (answer) {
            if (answer.buy = "Exit") {
                console.log("See you next time!");
                connection.end();
            }
            else {
                cart.push(answer.buy);
                console.log(cart);
            }
        });
};

// function amount() {
//     inquirer.prompt({
//         name: "amount",
//         type: "input",
//         message: "How many would you like?",
//         validate: function (value) {
//             if (isNaN(value) === false) {
//                 return true;
//             }
//             console.log("Please enter a number.")
//             return false;
//         }
//     })
//         .then(function (answer) {
//             console.log("Checking for product availability. Please wait.");
//             for (var i = 0; i < cart.length; i++) {
//                 var query = "SELECT * FROM products WHERE ?";
//                 connection.query(query, { product_name: cart[i] }, function (err, res) {
//                     if (err) throw err;
//                     console.log(res);
//                     if (res[0].stock_quantity >= answer.amount) {
//                         console.log(cart[i - 1] + " is available. Please review and confirm order.");
//                         connection.query("UPDATE products SET ? WHERE ?",
//                         [
//                             {
//                                 stock_quantity: stock_quantity -= answer.amount
//                             },
//                             {
//                                 product_name: cart[i - 1]
//                             }
//                         ]);
//                     }
//                     else {
//                         console.log("Quantity: " + res[0].stock_quantity);
//                         console.log("Insufficient quantity!");
//                         amount();
//                     };
//                 });
//             };

//         });
// };