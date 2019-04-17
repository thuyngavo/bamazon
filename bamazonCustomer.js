// require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// create connection to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

//=======================================================================
// function to display all products
//=======================================================================

function showProducts(){

    connection.query("SELECT * FROM Products", function(err, res){
        if(err) {
        
            throw err;
        
        }else {
            
            //console.log(res);

            for(var i = 0; i<res.length;i++){
                //var data = res.RowDataPacket
                var id = res[i].item_id;
                var productName = res[i].product_name;
                var departmentName = res[i].department_name;
                var price = res[i].price;
                var stockQuantity = res[i].stock_quantity;

                console.log(
                    "ID# " + id + 
                    "\nProduct: " + productName + 
                    "\nDepartment: " + departmentName + 
                    "\nPrice: " + price + 
                    "\nQTY: " + stockQuantity + 
                    "\n----------------------------------"
                );
            }
            purchase();
        }
    });
}

//=======================================================================
// function to prompt user to select a purchase item
//=======================================================================

function purchase(res){
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter the product ID of the item you want to purchase.",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }else{
                    return false;
                } 
            } 
        },

        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }else{
                    return false;
                } 
            }     
        },

        {
            type: "confirm",
            name: "confirm",
            message: "Are you sure:",
            default: true
        }
    ]).then(function(answer, res){
        if (answer.confirm) {
            var item = (answer.item_id);
            var quanitity = answer.quantity;
            
            
            for(var i = 0; i<res.length;i++){
                var price = res[i].price;
                var total = price*quanitity;
            }
            //confirmOrder(total);
//    });
//}
      
//=======================================================================
// function to confirm order
//=======================================================================

//function confirmOrder(total){

            connection.query('Select * FROM products WHERE item_id = ' + item, function(err,res){
                if(err){
                    console.log(err);

                } else if(quanitity <= res[0].stock_quantity){
                    console.log("Your total cost is $" + total + ". Thank you!");
                    
                    connection.query(
                        "UPDATE products SET stock_quantity = stock_quantity - " + quanitity 
                        + "WHERE item_id = " + item
                    );
                } else{
                    console.log("Insufficient quantity!");
                    restart();
                }
            });
        }else {
            console.log("See you next time!");
        }
    });
} 

//=======================================================================
// function ask user if they want purchase another item
//=======================================================================
function restart(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to purchase another item?",
            default: true
        }
    ]).then(function(answer){
        if(answer.confirm){
            showProducts();
        } else{
            console.log("Thank you for your business.");
        }
    });
}
      
showProducts();