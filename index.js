const express = require("express");
const cors = require("cors");
// const db = require("./db/config");
require("./db/config");
const User = require('./db/User');
const Product = require("./db/Product")
const Jwt = require('jsonwebtoken');
// const jwtKey = 'e-com';

const dotenv = require("dotenv");
dotenv.config();
const jwtKey = process.env.JWT_SECRET || 'e-com';

const app = express();
// const DatabaseURL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/dashboard';

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send("Something went wrong")  
        }
        resp.send({result,auth:token})
    })
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({user,auth:token})
            })
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product found" })
    }
});

app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)
}),

    app.get("/product/:id", async (req, resp) => {
        let result = await Product.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    })

app.put("/updateproduct/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

// app.put("/product/:id", async (req, resp) => {
//     let result = await Product.updateOne(
//         { _id: req.params.id },
//         { $set: req.body }
//     )
//     resp.send(result)
// });

app.get("/search/:key", async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            },
            {
                price : { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})
// app.listen(process.env.PORT || 5000, function () {
//     console.log('App running on port 5000.');
    

// });
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to the MongoDB database");
//   // Start the server after the MongoDB connection is established
//   app.listen(process.env.PORT || 5000, function () {
//     console.log('App running on port 5000.');
//   });
// });
app.listen(5000);