const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({
        "message": 'GET /products'
    })
})

router.post('/', (req, res) => {
    const { name, price } = req.body
    res.status(201).json({
        "message": 'POST /products',
        "product": {
            id: '4272324',
            name,
            price
        }
    })
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