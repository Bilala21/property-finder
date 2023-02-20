const express = require('express')
const app = express()
const router = express.Router()

const propertyController = require('../controllers/property/propertyController')
router.route('/products/create').post(propertyController.createProperty)

router.route('/create-main-categories').post(propertyController.createCategory) //for category

router.route('/create-child-category').post(propertyController.createChildCategory) //for child category

router.route('/products/create-sub-type').post(propertyController.createSubType) //for sub type category

router.route('/products').get(propertyController.getCategories) //for get category

router.route('/mix-products').get(propertyController.getMixProducts) //for get mix products

router.route('/product/:id').get(propertyController.productDetail) //for get single products

router.route('/child-category/:slug').get(propertyController.getChildCategories) //for get child categories

router.route('/get-main-categories').get(propertyController.getMainCategories) //for get Main categories
router.route('/get-sub-categories/:id').get(propertyController.getSubCategories) //for get Main categories

router.route('/product/filter/:slug').post(propertyController.filterProduct) //for filter propducts

router.route('/get-category-product/:slug').get(propertyController.getCategoryProducts) //for filter propducts

router.route('/:slug').get(propertyController.getSubType) //for filter propducts

router.route('*').get(function(_,res){
    return res.status(404).json({"message":"Route not found"})
})




module.exports = router