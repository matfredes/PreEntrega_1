const express = require('express')
const CartsManagerFS = require('../managers/cartsManagerFS.js')

const router = express.Router()
const cartsService = new CartsManagerFS()

router
    .post('/', async (req, res) => {
        try {
            const result = await cartsService.createCart()
            console.log(result)
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            res.status(500).send(`Error de server ${error.message}`)
        }
    })
    .get('/:cid', async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await cartsService.getCartById(parseInt(cid))
            res.send({
                status: 'success',
                payload: cart
            })
        } catch (error) {
            console.log(error)
        }
    })
    .post('/:cid/products/:pid', async (req, res) => {
        try {
            const { cid, pid } = req.params
            const result = await cartsService.addProductToCart(Number(cid), Number(pid))
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    })

module.exports = router