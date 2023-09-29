const express = require('express')
require('./db/config')
const cors = require('cors')
const User = require('./db/User')
const Product = require('./db/Product')
const webToken = require('jsonwebtoken')
const webTokenKey = 'e-comm'
const app = express()
app.use(express.json())
app.use(cors())



app.get("/", (req, res) => {
    res.send("get is running.....")
})

app.post('/signup', async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    webToken.sign({ result }, webTokenKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "something went worng" })
        }
        res.send({ result, auth: token })
    })
})

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            webToken.sign({ user }, webTokenKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "something went worng" })
                }
                res.send({ user, auth: token })
            })
        }
        else {
            res.send({ result: "user data is invalid please check" })
        }
    }
    else {
        res.send({ result: "please fill email and password both" })
    }
})

app.post('/add-product', verifyToken, async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
})

app.get("/show-products", verifyToken, async (req, res) => {
    let product = await Product.find()
    res.send(product)
})

app.delete("/show-products/:id",verifyToken, async (req, res) => {
    let product = await Product.deleteOne({ _id: req.params.id })
    res.send(product)
})

app.get("/show-products/:id",verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send("update data not found")

    }
})

app.put("/show-products/:id",verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        })

    if (result) {
        res.send(result)
    } else {
        res.send("update data not found")

    }

})

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { productName: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    res.send(result)
})

function verifyToken(req, res, next) {
    let checkToken = req.headers['authorization']   
    if(checkToken){
        checkToken = checkToken.split(" ")[1]
        webToken.verify(checkToken,webTokenKey,(err,valid)=>{
            if(err){
                res.status(401).send({ result: "please provide valid token" })
            }
            else{

                next()
            }
        })
    }
    else{
        res.status(403).send({ result: "please provide token in a header" })

    }
}


app.listen(5000)
