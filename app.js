var express = require('express');
var mysql = require("mysql");
var bodyParser = require('body-parser');
var app = express();

// Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


const port = process.env.PORT || 8080;


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



app.get("/", (req, results) => {
  var q = "SELECT COUNT(*) AS count FROM products";
  connection.query(q, function(err, res) {
    if (err) throw err;
    // console.log(res[0]);
    var count = res[0].count;
    // results.send('<h1>You have ' + count +  ' favorite songs.</h1>');
    // connection.end();
    results.render('home', {data: count});  
  });
});

app.get("/joke", (req, results) => {
  var joke = "how can you tell when..."
  results.send(joke);
//   var q = "SELECT COUNT(*) AS count FROM products";
//   connection.query(q, function(err, res) {
//     if (err) throw err;
//     // console.log(res[0]);
//     var count = res[0].count;
//     // results.send('<h1>You have ' + count +  ' favorite songs.</h1>');
//     // connection.end();
//     results.render('home', {data: count});  
//   });
});

app.post("/register", (request, results) => {
var item = {
  image: request.body.image,
  product_name: request.body.product_name,
  product_desc: request.body.product_desc,
  department_name: request.body.department_name,
  consumer_price: request.body.consumer_price,
  stock_quantity: request.body.stock_quantity,
  business_cost: request.body.business_cost
};
  console.log(JSON.stringify(request.body));
  // var s = {email: req.body.email};
  // console.log("Post Request Sent to Register", req.body);
  // var qinsert = "INSERT INTO products (song, artis, score, genre) VALUES("+ track.title +", "+ track.artist +", " + track.sc + "," + track.g + ")";
  
  var sql = `INSERT INTO products SET ?`;
  let query = connection.query(sql, item, (err, result) => {
    if(err){
      throw err;
    }
    console.log(result);
  }); // end of connection.query
  
  results.render('test', {data:5,
    image: request.body.image,
    product_name: request.body.product_name,
    product_desc: request.body.product_desc,
    department_name: request.body.department_name,
    consumer_price: request.body.consumer_price,
    stock_quantity: request.body.stock_quantity,
    business_cost: request.body.business_cost
  })
});
/*
router.get('/data', function(req, res){
  var obj = {};

    connection.query('SELECT * FROM products', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {print: result};
            res.render('print', obj);                
        }
    });

});
*/
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
