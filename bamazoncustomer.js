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
    afterConnection();
  });
  
  function afterConnection() {
    readInventory();

    // After displaying the current product inventory, check to see what the customer would like to buy..

//    readSongsRange();
//    readSpecificSong();
  }
  
function readInventory() {
    connection.query("SELECT product_name, department_name, price, stock_quantity FROM products", function( err, res ) {
        if ( err ) throw err;
        console.table( res );
        whatWouldYouLikeToBuy();
    });
}

function whatWouldYouLikeToBuy() {
    console.log( "Made it into asking what they would like to buy.." );
    inquirer
      .prompt([
      {
        name: "purchaseProduct",
        type: "input",
        message: "Which of these fine products would you like to purchase first?",
        validate: function( value ) {
            if ( isNaN( value ) === false ) {
              return true;
            }
            return false;
        }
      },
      {
        name: "units",
        type: "input",
        message: "How many of this item would you like to purchase at this time? ",
        validate: function( value ) {
        if ( isNaN( value ) ===  false ) {
              return true;
            }
            return false;
        }
      }])
      .then( function( answer ) {
/*
        var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
        connection.query(query, [answer.start, answer.end], function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log(
              "Position: " +
                res[i].position +
                " || Song: " +
                res[i].song +
                " || Artist: " +
                res[i].artist +
                " || Year: " +
                res[i].year
            );
          }
          runSearch();
        });
      });
*/
    });
}
