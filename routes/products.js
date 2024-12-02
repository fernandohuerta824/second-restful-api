const { Router } = require('express')
const Products = require('./../models/Products')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await Products.find()
        res.status(200).json({
            products
        })
    } catch(error) {
        error.status = 500
        error.message = 'Something failed'
        next(error)
    }

})

router.post('/', async (req, res) => {
    try {
        const { title, price, imageURL, description} = req.body
        const product = new Products({
            title,
            price,
            imageURL,
            description
        })

        await product.save()
        res.status(201).json({
            product
        })
    } catch(error) {
        error.status = 500
        error.message = 'Something failed'
        next(error)
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    res.status(200).json({
        "message": 'GET /products/:id',
        "id": id
    })
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    res.status(200).json({
        "message": 'PATCH /products/:id',
        "id": id
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    res.status(200).json({
        "message": 'DELETE /products/:id',
        "id": id
    })
})

module.exports = router;