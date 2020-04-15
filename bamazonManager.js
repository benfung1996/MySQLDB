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
    options();
});

function options() {
    cart = [];
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    })
        .then(function (answer) {
            switch (answer.option) {

                case "View Products for Sale":
                    viewSale();
                    break;

                case "View Low Inventory":
                    viewLow();
                    break;

                case "Add to Inventory":
                    addMore();
                    break;

                case "Add New Product":
                    addNew();
                    break;

                case "Exit":
                    console.log("Exit.")
                    connection.end();
                    break;
            };
        });
};


function viewSale() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(res);
        options();
    });
};

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        if (res = []) {
            console.log("We are well stocked!")
        }
        else {
            console.log(res)
        }
        options();
    });
}

function addMore() {
    connection.query("SELECT * FROM products ", function (err, res) {
        if (err) throw err;

        console.log("Current stock:");
        console.log(res)

        inquirer.prompt({
            name: "restock",
            type: "list",
            message: "Which product would you like to add more?",
            choices: ["Pen", "Eraser", "Paper", "Bottle Water", "Coffee", "Coke", "Banana", "Apple", "Avocado", "Sandwich", "Exit"]
        })
            .then(function (answer) {
                switch (answer.restock) {

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
                        console.log("Exit.")
                        connection.end();
                        break;
                };
            })
    });

};

function amount() {
    inquirer.prompt({
        name: "amount",
        type: "input",
        message: "How many would you like to add?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            console.log("Please enter a number.")
            return false;
        }
    })
        .then(function (answer) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { product_name: cart[0] }, function (err, res) {
                if (err) throw err;
                console.log(res);

                var quantity = JSON.parse(res[0].stock_quantity);
                var add = JSON.parse(answer.amount);

                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: quantity += add
                        },
                        {
                            product_name: cart[0]
                        }
                    ]);
                console.log(cart[0] + "has been restocked." + "\nCurrent quantity: " + quantity);
                options();
            });
        })
}

function addNew() {
    inquirer.prompt(
        [
            {
                name: "name",
                type: "input",
                message: "Please insert new product name."
            },
            {
                name: "department",
                type: "input",
                message: "Please insert department it belongs to." 
            },
            {
                name: "price",
                type: "input",
                message: "Please insert price."
            },
            {
                name: "stock",
                type: "input",
                message: "Please insert new product quantity.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.stock
            },
            function(err) {
                if (err) throw err;
                console.log("New product has been added to inventory!")
                options();
            })
        })

   
}