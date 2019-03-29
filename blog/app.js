var express = require("express");
var config = require("config"); //sử dụng config để có thể nhận được default.js
var bodyParser = require("body-parser")
var app = express();
var session = require("express-session");

// body parser create.
app.use(bodyParser.json()); // chuyển dữ liệu trong form thành dạng json.
app.use(bodyParser.urlencoded({extended: true})); // lấy được dữ liệu từ post form

app.set("trust proxy", 1)
app.use(session({
    secret: config.get("secret_key"),
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

app.set("views", __dirname + "/app/views"); // set thư mục để html và engine mặc định
app.set("view engine", "ejs"); // file .ejs template render html in res

//Static folder
app.use("/static", express.static(__dirname + "/public"));

// use controller.
var controller = require(__dirname + "/app/controller");

app.use(controller);

var host = config.get("server.host");
var port = config.get("server.port");

app.listen(port, host,  function(){
    console.log("Server is running port", port);
})

// app.listen(3000, function(){
//     console.log("Server is running port", 3000);
// })

// install xampp phpAdmin
