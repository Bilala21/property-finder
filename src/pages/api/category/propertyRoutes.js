const express = require('express')
const app = express()
const router = express.Router()


router.route('/').get((req,res)=>{
    return res.json(12)
})

router.route('*').get(function(_,res){
    return res.status(404).json({"message":"Route not found"})
})




module.exports = router