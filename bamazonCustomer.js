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
            
            for(var i = 0; i<res.length;i++){
                console.log(
                    res[i].Item_id + 
                    "\nProduct: " + res[i].product_name + 
                    "\nDepartment: " + res[i].department_name + 
                    "\nPrice: " + res[i].price + 
                    "\nQTY: " + res[i].stock_quantity + 
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

function purchase(){
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter the product ID of the item you want to purchase.",
            filter: Number
        },

        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to purchase?",
            filter: Number
        }
    ]).then(function(ans){
        var item = (ans.id);
        var quanitity = parseInt(ans.qty);
        var total = parseFloat(((res[item].Price)*quanitity));    
        confirmOrder(total);
    });
}
      
//=======================================================================
// function to confirm order
//=======================================================================

function confirmOrder(total){

    connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){
            console.log(err);

        } else if(quanitity <= res[0].stock_quantity){
			console.log("Your total cost is $" + total + ". Thank you!");
            
            connection.query(
                "UPDATE products SET stock_quantity = stock_quantity - " + quanitity 
                + "WHERE item_id = " + ID
            );
		} else{
            console.log("Insufficient quantity!");
            restart();
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
            name: "reply",
            message: "Would you like to purchase another item?"
        }
    ]).then(function(ans){
        if(ans.reply){
            showProducts();
        } else{
            console.log("Thank you for your business.");
        }
    });
}
      
showProducts();