const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')
const db = require('./utils/database')

const app = express()

const PORT = process.env.PORT || 8080

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '192.168.100.188')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if(req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST; PUT, PATCH, DELETE')
        return res.status(200).json()
    }
        
    next()
})
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

const server = http.createServer(app)

app.use((req, res, next) => {
    const error = new Error()
    error.status = 404
    error.message = 'That endpoint does not exists'
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        "message": error.message
    })
})

db
    .then(() => {
        server.listen(PORT, () => console.log('Server running on port ' + PORT))
    })
    .catch(e => console.log(e))
