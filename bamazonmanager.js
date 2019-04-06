var mysql = require( "mysql" );
var inquirer = require( "inquirer" );

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });
  
  connection.connect( function( err ) {
    if ( err ) throw err;
    console.log( "connected as id " + connection.threadId );
    topLevelMenu();
  });
  
function topLevelMenu() {
    inquirer
    .prompt({
      name: "managerFunction",
      type: "list",
      message: "Would you like to [View Products], [View Low Inventory], [Add Inventory], or [Add a Product]?",
      choices: [ "View Products", "View Low Inventory", "Add Inventory", "Add a Product", "Exit" ]
    })
    .then( function( answer ) {
      // based on their answer...
      switch ( answer.managerFunction ) {

        case "View Products":
          viewProducts();
          break;

        case "View Low Inventory":
          viewLowInventory();
          break;

        case "Add Inventory":
          addInventory();
          break;

        case "Add a Product":
          addAProduct();
          break;
          
        case "Exit":
        default:
          connection.end();
      }
    });
}

function viewProducts() {
    connection.query( "SELECT product_name, department_name, price, stock_quantity FROM products", function( err, res ) {
        if ( err ) throw err;
        console.table( res );
        topLevelMenu();
    });
}

function viewLowInventory() {
    connection.query( "SELECT product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity < 10", function( err, res ) {
        if ( err ) throw err;
        console.table( res );
        topLevelMenu();
    });
}

function addInventory() {
    connection.query( "SELECT product_name, stock_quantity FROM products", function( err, res ) {
        if ( err ) throw err;
        console.table( res );
        addInventoryMenu( res );
    });
}

function addInventoryMenu( results ) {
    inquirer
    .prompt([
    {
        name: "choice",
        type: "rawlist",
        choices: function() {
            var choiceArray = [];
            for ( var i = 0; i < results.length; i++ ) {
                choiceArray.push( results[ i ].product_name );
            }

            return choiceArray;
        },
        message: "What item for which you would you like to add inventory? (<ctrl>-c to quit)",
    },
    {
        name: "howMany",
        type: "input",
        message: "How many of this item would you like to add at this time? ",
        validate: function( value ) {
            return (( value > 0 ) && ( parseInt( value ) == parseFloat( value )));
        }
    }])
    .then( function( answers ) {
        // So.. They want to buy something.  Let's see if we have enough of "those"..
        for ( var i = 0; i < results.length; i++ ) {
            if ( answers.choice === results[ i ].product_name ) {
                // DOn't need to check current level so just continue on..
                var howManyNOW = parseInt( results[ i ].stock_quantity ) + parseInt( answers.howMany );
                var myQuery = "UPDATE products SET stock_quantity=" + howManyNOW + 
                                " WHERE item_id=" + ( i + 1 );
                connection.query( myQuery, function( err, res ) {
                    if ( err ) throw err;
                    console.log( "Inventory level updated.");
                    topLevelMenu();
                });
            }
        }
    });
}

function addAProduct() {
    inquirer
    .prompt([
    {
        name: "product",
        message: "Please enter the Product Name you would like to add: "
    },
    {
        name: "department",
        message: "Product Department: "
    },
    {
        name: "price",
        message: "ProductPrice: ",
        validate: function( value ) {
            if ( isNaN( value ) === false && parseFloat( value ) > 0 ) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        name: "stock_quantity",
        message: "Stock Quantity: ",
        validate: function(value) {
            if ( isNaN( value ) === false && parseInt( value ) >= 0 ) {
                return true;
            }

            return false;
        }
    }])
    .then( function( answers ) {
        // Ready to add this new product to the database..
        connection.query("INSERT INTO products ( product_name, department_name, price, stock_quantity )" +
                         " VALUES( '" + answers.product + "', '" + answers.department + "', '" + answers.price + "', '" + answers.stock_quantity + "')", function( err, res ) {
            if ( err ) throw err;
            topLevelMenu();
        });
    });
}

