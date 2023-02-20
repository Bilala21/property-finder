const express = require('express')
const app = express()
const router = express.Router()

const propertyController = require('../controllers/property/propertyController')
router.route('/products/create').get(propertyController.createProperty)
router.route('/products').get(propertyController.getProperty)


router.route('*').get(function(_,res){
    return res.status(404).json({"message":"Route not found"})
})




module.exports = router