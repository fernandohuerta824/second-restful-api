const { Router } = require('express')
const Products = require('./../models/Products')
const { Types } = require('mongoose')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await Products.find()
        res.status(200).json({
            products
        })
    } catch(error) {
        error.status ||= 500
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
        error.status ||= 500
        error.message = 'Something failed'
        next(error)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    if(!Types.ObjectId.isValid(id))
        return res.status(404).json({
            "message": 'Product not found',
    })

    const product = await Products.findById(new Types.ObjectId(id))

    if(!product)
        return res.status(404).json({
            "message": 'Product not found',
        })

        res.status(200).json({
            "message": 'Product found',
            product
        })

    
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body
        const allowedFields = ['title', 'price', 'imageURL', 'description'];
        const fieldsToUpdate = Object.keys(req.body);

        if (!fieldsToUpdate.every(field => allowedFields.includes(field))) {
            const allowedFieldsMessage = allowedFields.join('\n- ');
            return res.status(400).json({
                message: `One or more fields are not allowed to update.\nAllowed fields to update:\n- ${allowedFieldsMessage}`
            });
        }

        if(!Types.ObjectId.isValid(id))
            return res.status(404).json({message: "Product not found"})

        const product = await Products.findByIdAndUpdate(
            id,
            { $set: updates },
            { new : true}
        )

        if(!product)
            return res.status(404).json({message: "Product not found"})
        
        res.status(200).json({
            "message": 'Product modified successfully',
            product,
    })
    } catch(error) {
        error.status ||= 500
        error.message = 'Something failed'
        next(error)
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    res.status(200).json({
        "message": 'DELETE /products/:id',
        "id": id
    })
})

module.exports = router;