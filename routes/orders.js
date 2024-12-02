const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({
        "message": 'GET /orders'
    })
})

router.post('/', (req, res) => {
    res.status(201).json({
        "message": 'POST /orders'
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    res.status(200).json({
        "message": 'GET /orders/:id',
        "id": id
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    res.status(200).json({
        "message": 'DELETE /orders/:id',
        "id": id
    })
})

module.exports = router;