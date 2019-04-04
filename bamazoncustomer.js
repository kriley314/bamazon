var mysql = require( "mysql" );
var inquirer = require( "inquirer" );

// Defining this globally to avoid threading issues.
var transactionCost = 0;

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
    afterConnection();
  });
  
  function afterConnection() {
    readInventory();
  }
  
function readInventory() {
    connection.query("SELECT product_name, department_name, price, stock_quantity FROM products", function( err, res ) {
        if ( err ) throw err;
        console.table( res );
        handleSales( res );
    });
}

function handleSales( results ) {
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
        message: "What item would you like to purchase? (<ctrl>-c to quit)",
    },
    {
        name: "howMany",
        type: "input",
        message: "How many of this item would you like to purchase at this time? ",
        validate: function( value ) {
            return ( value > 0 )
        }
    }])
    .then( function( answers ) {
        // So.. They want to buy something.  Let's see if we have enough of "those"..
        for ( var i = 0; i < results.length; i++ ) {
            if ( answers.choice === results[ i ].product_name ) {
                // Do we have enough?
                if ( results[ i ].stock_quantity >= answers.howMany ) {
                    var howManyLeft = results[ i ].stock_quantity - answers.howMany;
                    transactionCost = answers.howMany * results[ i ].price;
                    myQuery = "UPDATE products SET stock_quantity=" + howManyLeft + 
                              " WHERE item_id=" + ( i + 1 );
                    connection.query( myQuery, function( err, res ) {
                        if ( err ) throw err;
                        console.log( "You account has been debited, $" + parseFloat( transactionCost ).toFixed( 2 ));
                        readInventory();
                    });
                } else {
                    console.log( "Unfortunately we don't currently have that many in stock - we can only sell you " + results[ i ].stock_quantity + " at the moment." );
                    readInventory();
                }
            }
        }
    });
}
